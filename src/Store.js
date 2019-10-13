import React, { createContext, useContext, useReducer } from "react";
import slack from "slack";

import { ProcessState, TodoStatus } from "./constants";
import sendMessage, { resetSlack } from "./lib/slack";

const initialValue = {
  todos: [
    {
      value: "Checkout latest master HEAD from origin",
      status: TodoStatus.CREATED
    },
    {
      value: "Checkout latest master HEAD from origin",
      status: TodoStatus.CREATED
    },
    {
      value: "Checkout latest master HEAD from origin",
      status: TodoStatus.CREATED
    },
    {
      value: "Checkout latest master HEAD from origin",
      status: TodoStatus.CREATED
    },
    {
      value: "Checkout latest master HEAD from origin",
      status: TodoStatus.CREATED
    }
  ],
  process: {
    state: ProcessState.EDITION,
    startTimestamp: null,
    endTimestamp: null,
    running: false,
    currentIndex: 0
  },
  slack: {
    channel: "",
    token: "",
    ts: ""
  },
  drawer: {
    open: false
  }
};

function reducer(prevState, action) {
  const { type } = action;

  console.log(action);

  if (type === "ADD_TODO") {
    return {
      ...prevState,
      todos: [...prevState.todos, { value: `${prevState.todos.length}. Task` }]
    };
  }

  if (type === "UPDATE_TODO") {
    return {
      ...prevState,
      todos: prevState.todos.map((todo, index) => {
        if (index === action.index) {
          return {
            ...todo,
            value: action.value
          };
        }

        return todo;
      })
    };
  }

  if (type === "DELETE_TODO") {
    return {
      ...prevState,
      todos: prevState.todos.filter((_, index) => action.index !== index)
    };
  }

  if (
    type === "LOCK_PROCESS" &&
    prevState.process.state === ProcessState.EDITION
  ) {
    return {
      ...prevState,
      todos: prevState.todos.map(todo => ({
        ...todo,
        status: TodoStatus.CREATED
      })),
      process: {
        ...prevState.process,
        state: ProcessState.PROCESS,
        currentIndex: 0,
        running: false
      }
    };
  }

  if (type === "CANCEL_PROCESS") {
    return {
      ...prevState,
      process: {
        ...prevState.process,
        state: ProcessState.EDITION
      }
    };
  }

  if (type === "ABORT_PROCESS") {
    return {
      ...prevState,
      process: {
        ...prevState.process,
        state: ProcessState.REPORT,
        running: false,
        endTimestamp: action.timestamp
      }
    };
  }

  if (type === "START_PROCESS") {
    return {
      ...prevState,
      process: {
        ...prevState.process,
        startTimestamp: action.timestamp,
        running: true,
        currentIndex: 0
      }
    };
  }

  if (type === "NEXT_STEP") {
    const isLast =
      prevState.todos.length - 1 === prevState.process.currentIndex;

    if (isLast) {
      return {
        ...prevState,
        todos: prevState.todos.map((todo, index) => {
          if (index === action.index) {
            return {
              ...todo,
              status: TodoStatus.VALIDATED
            };
          }
          return todo;
        }),
        process: {
          ...prevState.process,
          state: ProcessState.REPORT,
          running: false,
          endTimestamp: action.timestamp
        }
      };
    }

    return {
      ...prevState,
      todos: prevState.todos.map((todo, index) => {
        if (index === action.index) {
          return {
            ...todo,
            status: TodoStatus.VALIDATED
          };
        }

        return todo;
      }),
      process: {
        ...prevState.process,
        currentIndex: prevState.process.currentIndex + 1
      }
    };
  }

  if (type === "DELETE_TODO") {
    return {
      ...prevState,
      todos: prevState.todos.filter((_, index) => action.index !== index)
    };
  }

  if (type === "CLOSE_DRAWER") {
    return {
      ...prevState,
      drawer: {
        ...prevState.drawer,
        open: false
      }
    };
  }

  if (type === "OPEN_DRAWER") {
    return {
      ...prevState,
      drawer: {
        ...prevState.drawer,
        open: true
      }
    };
  }

  if (type === "UPDATE_SETTINGS") {
    const { value, path } = action;

    return {
      ...prevState,
      [path[0]]: {
        ...prevState[path[0]],
        [path[1]]: value
      }
    };
  }
  return prevState;
}

const reduceUpdateMessage = state => {
  function emoji(todo, selected) {
    if (selected) {
      return "📦";
    } else {
      if (todo.status === TodoStatus.VALIDATED) {
        return "✅";
      } else if (todo.status === TodoStatus.FAILED) {
        return "💥";
      } else {
        return "";
      }
    }
  }

  let message = state.todos.reduce((acc, todo, index) => {
    return `${acc}${index > 0 ? "\n" : ""}${index + 1}. ${todo.value} ${emoji(
      todo,
      index === state.process.currentIndex
    )}`;
  }, "");
  return `<Process title>\n\n${message}`;
};

const middleware = async (store, action, next) => {
  const { type } = action;

  next(action);

  let [state, dispatch] = store;

  if (
    type === "START_PROCESS" ||
    type === "NEXT_STEP" ||
    type === "ABORT_PROCESS"
  ) {
    // Remove the saved `ts`
    if (type === "START_PROCESS") {
      resetSlack();
    }

    try {
      const ts = await sendMessage(reduceUpdateMessage(state), {
        token: state.slack.token
      });
    } catch (err) {
      console.log(err);
    }
  }

  return action;
};

const StoreContext = createContext(initialValue);

export default function Store(props) {
  let localStorageState = localStorage.getItem("state");
  const store = useReducer((state, action) => {
    let nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  }, localStorageState ? JSON.parse(localStorageState) : initialValue);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore(asynchronously = false) {
  let store = useContext(StoreContext);
  let [state, dispatch] = store;

  async function asyncDispatch(action) {
    await middleware(store, action, () => {
      dispatch(action);
    });
  }

  return [state, asynchronously ? asyncDispatch : dispatch];
}

export function useStoreState() {
  let store = useContext(StoreContext);
  return store[0];
}

export function useStoreDispatch() {
  let store = useContext(StoreContext);
  return store[1];
}
