import { NavLink } from "react-router";

export default function TopNav() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/articles">Articles</NavLink>
        </nav>
    );
}
