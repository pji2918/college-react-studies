import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { SessionContext } from "../contexts/contexts";
import Loading from "./Loading";

export default function TopNav() {
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const { user, ready } = useContext(SessionContext);
    const navigate = useNavigate();

    async function logout() {
        setPending(true);
        setError("");
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "요청 처리 중 오류가 발생했습니다.",
            );
        } finally {
            setPending(false);
        }
    }

    if (!ready) return <Loading />;

    return (
        <nav>
            <header className="topbar">
                <h1>
                    <Link to="/">우리 반 게시판</Link>
                </h1>
                {!user ? (
                    <div>
                        <button onClick={() => navigate("/auth")}>
                            로그인
                        </button>
                    </div>
                ) : (
                    <div>
                        <span>{user.email}</span>{" "}
                        <button onClick={logout} disabled={pending}>
                            {pending ? "로그아웃 중…" : "로그아웃"}
                        </button>
                    </div>
                )}
            </header>
            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
            {/* {user ? <Board key={user.id} user={user} /> : <AuthForm />} */}
        </nav>
    );
}
