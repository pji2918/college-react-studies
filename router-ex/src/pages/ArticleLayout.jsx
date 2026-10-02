import { Link, Outlet } from "react-router";

export default function ArticleLayout() {
    return (
        <>
            <ul>
                <li>
                    <Link to="/articles">Article Main</Link>
                </li>
                <li>
                    <Link to="/articles/info">Info.</Link>
                </li>
                <li>
                    <Link to="/articles/history">History</Link>
                </li>
            </ul>

            <Outlet />
        </>
    );
}
