import { Route, Routes } from "react-router";
import "./App.css";
import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Test from "./pages/Test";

export default function App() {
    return (
        <>
            <TopNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </>
    );
}
