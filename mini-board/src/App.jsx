import { BrowserRouter, Route, Routes } from "react-router";
import SessionProvider from "./contexts/prodivers";
import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import AuthForm from "./components/AuthForm";
import NotFound from "./components/NotFound";

export default function App() {
    return (
        <SessionProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/auth" element={<AuthForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </SessionProvider>
    );
}
