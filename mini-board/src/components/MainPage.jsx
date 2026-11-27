import { useContext } from "react";
import { SessionContext } from "../contexts/contexts";
import Board from "./Board";
import Loading from "./Loading";

export default function MainPage() {
    const { user, ready } = useContext(SessionContext);

    if (!ready) return <Loading />;

    if (user) {
        return (
            <main>
                <Board key={user.id} />
            </main>
        );
    } else {
        return <main>로그인하세요.</main>;
    }
}
