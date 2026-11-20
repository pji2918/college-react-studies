import { createContext } from "react";

export const TodoContext = createContext({
    todos: [],
});

export const TodoDispatchContext = createContext({
    addTodo: null,
    deleteTodo: null,
});
