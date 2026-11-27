import { useContext } from "react";
import { SessionContext } from "../contexts/context";
import { useNavigate } from "react-router";

export default function MainPage() {
    const { user } = useContext(SessionContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return <>Not Signed IN</>;
    } else {
        return <>you are the {user?.email}!</>;
    }
}
