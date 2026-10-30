import { useEffect, useState } from "react";

export default function Test() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Test Mounted!");

        return () => console.log("Test Unmounted");
    }, []);
    useEffect(() => {
        console.log(`Test Updated:${count}`);
    });

    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
