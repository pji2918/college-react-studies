import { useReducer, useCallback } from "react";
import { TodoContext, TodoDispatchContext } from "./context";
import { todoReducer } from "../reducers";
import { useMemo } from "react";

export function TodoProvider({ children }) {
    const [todos, dispatch] = useReducer(todoReducer, []);

    const addTodo = useCallback((todo) => {
        dispatch({ type: "ADD", payload: todo });
    }, []);
    const deleteTodo = useCallback((id) => {
        dispatch({ type: "DELETE", id });
    }, []);
    const todoDispatch = useMemo(
        () => ({ addTodo, deleteTodo }),
        [addTodo, deleteTodo],
    );

    return (
        <TodoContext.Provider value={{ todos }}>
            <TodoDispatchContext.Provider value={todoDispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    );
}
