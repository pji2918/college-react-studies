import { useState } from "react";

export default function AddToDo({ addToDo }) {
    const [value, setValue] = useState("");

    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => addToDo(value)}>추가</button>
        </>
    );
}
