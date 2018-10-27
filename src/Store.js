import React, { createContext, useContext, useReducer } from "react";

const initialValue = {
  todos: []
};

function reducer(prevState, action) {
  const { type } = action;

  console.log("Action", type);

  if (type === "ADD_TODO") {
    return {
      ...prevState,
      todos: [
        ...prevState.todos,
        { value: `${prevState.todos.length}. Task`, done: false }
      ]
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
