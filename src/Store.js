import React, { createContext, useContext, useReducer } from "react";
import { ProcessState, TodoStatus } from "./constants";

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
    state: ProcessState.PROCESS,
    startTimestamp: null,
    running: false,
    currentIndex: 0
  }
};

function reducer(prevState, action) {
  const { type } = action;

  console.log("Action", type);

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

  if (type === "LOCK_PROCESS" && prevState.state === ProcessState.EDITION) {
    return {
      ...prevState,
      process: {
        ...prevState.process,
        state: ProcessState.PROCESS
      }
    };
  }

  if (type === "ABORT_PROCESS") {
    return {
      ...prevState,
      process: {
        ...prevState.process,
        state: ProcessState.REPORT
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

  return prevState;
}

const StoreContext = createContext(initialValue);

export default function Store(props) {
  const store = useReducer(reducer, initialValue);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  let store = useContext(StoreContext);
  return store;
}

export function useStoreState() {
  let store = useContext(StoreContext);
  return store[0];
}

export function useStoreDispatch() {
  let store = useContext(StoreContext);
  return store[1];
}
