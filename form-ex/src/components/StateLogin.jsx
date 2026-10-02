import { useState } from "react";

export default function StateLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnClick = () => {
        console.log(username);
        console.log(password);
        const ojb = { username, password };
        console.log(ojb);
    };

    return (
        <>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleOnClick}>LOGIN</button>
        </>
    );
}
