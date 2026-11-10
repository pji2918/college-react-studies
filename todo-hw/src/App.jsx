import { useState } from "react";
import "./App.css";
import ToDoElement from "./components/ToDoElement";
import AddToDo from "./components/AddToDo";
import { useCallback } from "react";

export default function App() {
    console.log("Rendered App.");
    const [todos, setTodos] = useState([
        {
            id: 0,
            title: "테스트",
            completed: false,
        },
    ]);

    const addToDo = useCallback((title) => {
        setTodos((prev) => [
            ...prev,
            {
                id: Math.random() * 100,
                title,
                completed: false,
            },
        ]);
    }, []);
    const setComplete = useCallback((id, value) => {
        setTodos((prev) => {
            const copy = Array.from(prev);
            copy.find((value) => value.id == id).completed = value;
            return copy;
        });
    }, []);

    return (
        <>
            <h1>To-Do</h1>
            <AddToDo addToDo={addToDo} />
            <br />
            {todos.map((value) => (
                <div key={value.id}>
                    <ToDoElement setComplete={setComplete} {...value} />
                    <br />
                </div>
            ))}
        </>
    );
}
