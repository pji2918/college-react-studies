import { useReducer } from "react";
import { TodoContext } from "./context";
import { todoReducer } from "../reducers";

export function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const addTodo = (todo) => {
        dispatch({ type: "ADD", payload: todo });
    };
    const deleteTodo = (id) => {
        dispatch({ type: "DELETE", id });
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
}
