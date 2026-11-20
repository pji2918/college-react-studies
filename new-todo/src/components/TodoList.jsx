import { useContext } from "react";
import { TodoContext } from "../contexts/context";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const { todos } = useContext(TodoContext);

    return (
        <>
            {todos.map((value) => (
                <TodoItem key={value.id} {...value} />
            ))}
        </>
    );
}
