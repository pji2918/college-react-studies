import { useContext } from "react";
import { createContext } from "react";

const InfoContext = createContext({ name: null, role: null });

function Child2() {
    const { name } = useContext(InfoContext);

    return <h3>{name}</h3>;
}

function Child1() {
    const { role } = useContext(InfoContext);

    return (
        <>
            <h3>{role}</h3>
            <Child2 />
        </>
    );
}

export default function ContextEx1() {
    return (
        <>
            <InfoContext.Provider value={{ name: "ABCD", role: "ADMIN" }}>
                <h1>ContextEx1</h1>
                <Child1 />
            </InfoContext.Provider>
        </>
    );
}
