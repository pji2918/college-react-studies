import { useContext } from "react";
import { SessionContext } from "../contexts/context";
import { Link, useNavigate } from "react-router";

export default function MainPage() {
    const { user } = useContext(SessionContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
    } else {
        return (
            <>
                you are the {user?.email}! <Link to="/logout">Sign out</Link>
            </>
        );
    }
}
