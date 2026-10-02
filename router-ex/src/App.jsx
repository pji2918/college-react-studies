import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Articles from "./pages/Articles";
import TopNav from "./components/TopNav";
import NotFound from "./pages/NotFound";
import Info from "./pages/Info";
import History from "./pages/History";
import ArticleLayout from "./pages/ArticleLayout";
import UserDetail from "./pages/UserDetail";

export default function App() {
    return (
        <>
            <TopNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/articles" element={<ArticleLayout />}>
                    <Route index element={<Articles />} />
                    <Route path="info" element={<Info />} />
                    <Route path="history" element={<History />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
