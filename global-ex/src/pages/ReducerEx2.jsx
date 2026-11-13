import { useReducer } from "react";
import { userReducer } from "../reducers";
import { useState } from "react";

export default function ReducerEx2() {
    const [user, dispatch] = useReducer(userReducer, {
        name: "user",
        email: "user@example.org",
    });
    const [text, setText] = useState("");
    const changeName = () => {
        dispatch({ type: "name", payload: text });
        setText("");
    };
    const changeEmail = () => {
        dispatch({ type: "email", payload: text });
        setText("");
    };

    return (
        <>
            <h1>ReducerEx2</h1>
            <h3>
                Name:{user.name}, Email:{user.email}
            </h3>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={changeName}>NAME</button>
            <button onClick={changeEmail}>EMAIL</button>
        </>
    );
}
