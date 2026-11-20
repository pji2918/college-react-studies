import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthForm() {
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const isSignup = mode === "signup";

    async function handleSubmit(event) {
        event.preventDefault();
        if (busy) return;
        setBusy(true);
        setError("");
        setMessage("");
        try {
            const credentials = { email: email.trim(), password };
            if (isSignup) {
                const { data, error } = await supabase.auth.signUp({
                    ...credentials,
                    options: { emailRedirectTo: window.location.origin },
                });
                if (error) throw error;
                if (!data.session) {
                    setMessage(
                        "가입을 요청했습니다. 이메일의 인증 링크를 확인하세요. 기존 계정이라면 로그인하세요.",
                    );
                }
            } else {
                const { error } =
                    await supabase.auth.signInWithPassword(credentials);
                if (error) throw error;
            }
            setPassword("");
            // 로그인 성공 시 App의 Auth 이벤트가 화면을 바꿉니다.
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "요청 처리 중 오류가 발생했습니다.",
            );
        } finally {
            setBusy(false);
        }
    }

    function switchMode() {
        setMode(isSignup ? "login" : "signup");
        setMessage("");
        setError("");
        setPassword("");
    }

    return (
        <section className="card auth">
            <h2>{isSignup ? "회원가입" : "로그인"}</h2>
            <p>게시판은 로그인한 회원만 이용할 수 있습니다.</p>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={busy}>
                    <label>
                        이메일
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        비밀번호
                        <input
                            type="password"
                            required
                            minLength={8}
                            autoComplete={
                                isSignup ? "new-password" : "current-password"
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <small>실습에서는 8자 이상 사용합니다.</small>
                    <button type="submit">
                        {busy ? "처리 중…" : isSignup ? "가입하기" : "로그인"}
                    </button>
                </fieldset>
            </form>
            {error && (
                <p role="alert" className="error">
                    {error}
                </p>
            )}
            {message && <p role="status">{message}</p>}
            <button type="button" onClick={switchMode} disabled={busy}>
                {isSignup
                    ? "이미 계정이 있어요 → 로그인"
                    : "처음이에요 → 회원가입"}
            </button>
        </section>
    );
}
