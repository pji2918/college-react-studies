import "./App.css";
import Comp, { add, MIN, MAX } from "./components/Comp";

function App() {
    const onClick = (message) => {
        alert(message);
    };

    return (
        <div>
            {MIN}, {MAX}, {add(1, 2)}
            <Comp onClick={onClick} />
        </div>
    );
}

export default App;
