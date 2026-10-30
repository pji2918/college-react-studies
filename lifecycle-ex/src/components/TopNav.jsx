import { NavLink } from "react-router";

export default function TopNav() {
    return (
        <nav>
            <NavLink to="/">Home </NavLink>
            <NavLink to="/test">Test </NavLink>
            <NavLink to="/users">Users </NavLink>
        </nav>
    );
}
