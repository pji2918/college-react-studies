// /* eslint-disable react-hooks/refs */
// import { useState } from "react";
// import "./App.css";
// import { useRef } from "react";

// export default function App() {
//     const [count, setCount] = useState(0);
//     const value = useRef(0);
//     const btn = useRef(null);
//     console.log(`App 렌더링 - state:${count}, ref:${value}`);

//     return (
//         <>
//             <button
//                 onClick={() => {
//                     setCount(count + 1);
//                     if (btn) {
//                         btn.current.click();
//                     }
//                 }}
//             >
//                 state: {count}
//             </button>
//             <button ref={btn} onClick={() => ++value.current}>
//                 value: {value.current}
//             </button>
//         </>
//     );
// }
import { memo, useState, useCallback } from "react";
const Greeting = memo(({ name, handleClick }) => {
    console.log(`Greeting 렌더링 - ${name}`);
    return <p onClick={handleClick}>안녕하세요, {name}!</p>;
});
function App() {
    const [name, setName] = useState("홍길동");
    const [count, setCount] = useState(0);
    console.log(`App 렌더링 - ${name}, ${count}`);
    const handleClick = useCallback(() => {
        alert(name);
    }, [name]);
    return (
        <>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <Greeting name={name} handleClick={handleClick} />
            <button onClick={() => setCount(count + 1)}>
                {" "}
                클릭 횟수: {count}
            </button>
        </>
    );
}
export default App;
