import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import AuthForm from "./components/AuthForm";
import Board from "./components/Board";

export default function App() {
    const [session, setSession] = useState(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState("");
    const [signingOut, setSigningOut] = useState(false);

    useEffect(() => {
        // INITIAL_SESSION 이벤트로 저장된 세션도 전달받습니다.
        // 이 콜백에서는 다른 Supabase 요청을 await하지 않습니다.
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            setReady(true);
            setError("");
        });
        return () => subscription.unsubscribe();
    }, []);

    async function logout() {
        setSigningOut(true);
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
            setSigningOut(false);
        }
    }

    if (!ready)
        return (
            <main>
                <p role="status">로그인 상태 확인 중…</p>
            </main>
        );

    return (
        <main>
            <header className="topbar">
                <h1>우리 반 게시판</h1>
                {session && (
                    <div>
                        <span>{session.user.email}</span>{" "}
                        <button onClick={logout} disabled={signingOut}>
                            {signingOut ? "로그아웃 중…" : "로그아웃"}
                        </button>
                    </div>
                )}
            </header>
            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
            {session ? (
                <Board key={session.user.id} user={session.user} />
            ) : (
                <AuthForm />
            )}
        </main>
    );
}
