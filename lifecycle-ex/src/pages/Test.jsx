import { useEffect, useState } from "react";

export default function Test() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    useEffect(() => {
        console.log("Test Mounted!");
        const interval = setInterval(() => console.log("start interval"), 1000);

        return () => {
            console.log("Test Unmounted");
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        console.log(count);
    }, [count]);

    return (
        <>
            <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </>
    );
}
