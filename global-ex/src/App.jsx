import { Link, Routes, Route } from "react-router";
import ReducerEx1 from "./pages/ReducerEx1";
import ReducerEx2 from "./pages/ReducerEx2";
import ContextEx1 from "./pages/ContextEx1";
import ContextEx2 from "./pages/ContextEx2";

import "./App.css";

export default function App() {
    return (
        <>
            <nav>
                <Link to="/">Home </Link>
                <Link to="/reducer1">ReducerEx1 </Link>
                <Link to="/reducer2">ReducerEx2 </Link>
                <Link to="/context1">ContextEx1 </Link>
                <Link to="/context2">ContextEx2 </Link>
            </nav>
            <Routes>
                <Route path="/" element={<ReducerEx1 />} />
                <Route path="/reducer1" element={<ReducerEx1 />} />
                <Route path="/reducer2" element={<ReducerEx2 />} />
                <Route path="/context1" element={<ContextEx1 />} />
                <Route path="/context2" element={<ContextEx2 />} />
            </Routes>
        </>
    );
}
