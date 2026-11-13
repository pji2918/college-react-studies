import { useContext } from "react";
import { UserContext } from "../context/contexts";
import { UserProvider } from "../context/providers";
import { useState } from "react";

function Child2() {
    const { user } = useContext(UserContext);
    return (
        <h3>
            {user.name} {user.email}
        </h3>
    );
}

function Child() {
    const { changeName } = useContext(UserContext);
    const [text, setText] = useState("");

    return (
        <>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={() => changeName(text)}>Name</button>
        </>
    );
}

export default function ContextEx2() {
    return (
        <>
            <h1>ContextEx2</h1>
            <UserProvider>
                <Child />
                <Child2 />
            </UserProvider>
        </>
    );
}
