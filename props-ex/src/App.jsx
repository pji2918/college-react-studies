import { useState } from "react";
import "./App.css";

export default function App() {
    const [todoList, setTodoList] = useState([]);
    const [inputData, setInputData] = useState("");

    const handleAdd = () => {
        if (inputData) {
            setTodoList([...todoList, inputData]);
        }
        setInputData("");
    };

    const handleChange = (event) => setInputData(event.target.value);
    return (
        <>
            <input type="text" value={inputData} onChange={handleChange} />
            <button onClick={handleAdd}>ADD</button>

            <ul>
                {todoList.map((value) => (
                    <li key={value}>{value}</li>
                ))}
            </ul>
        </>
    );
}
