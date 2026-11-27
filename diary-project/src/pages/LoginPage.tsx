import { useContext, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router";
import type { ErrorCode } from "@supabase/auth-js/src/lib/error-codes";
import { SessionContext } from "../contexts/context";

export default function LoginPage() {
    const email = useRef("");
    const password = useRef("");
    const [pageType, setPageType] = useState<"login" | "register">("login");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<ErrorCode | undefined>(undefined);
    const loginRegisterText = pageType === "login" ? "로그인" : "회원가입";
    const navigate = useNavigate();
    const { user } = useContext(SessionContext);

    if (user) return <main>이미 로그인되어 있습니다.</main>;

    const handleSubmit = async () => {
        setPending(true);
        const credentials = {
            email: email.current.trim(),
            password: password.current,
        };

        if (pageType === "login") {
            const { error } =
                await supabase.auth.signInWithPassword(credentials);
            if (!error) {
                navigate("/", { replace: true });
            } else {
                console.warn(error.code);
                if (error.code === "invalid_credentials") {
                    setError("invalid_credentials");
                }
            }
        } else {
            const { error } = await supabase.auth.signUp(credentials);
            if (!error) {
                navigate("/", { replace: true });
            } else {
                console.warn(error.code);
                if (error.code === "user_already_exists") {
                    setError("user_already_exists");
                }
            }
        }
        setPending(false);
    };

    return (
        <main className="flex items-center justify-center h-dvh bg-sky-100">
            <form
                className="md:card max-md:w-full max-md:h-full bg-white shadow-sm min-w-96 min-h-96 p-5"
                onSubmit={async (e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="card-body flex flex-col gap-5 justify-center items-center">
                    <h1 className="card-title text-3xl font-bold">
                        {loginRegisterText}
                    </h1>
                    {!error && <div className="h-1" />}
                    {error &&
                        ((error === "invalid_credentials" && (
                            <div className="w-full alert alert-error alert-soft alert-vertical">
                                이메일 또는 비밀번호가 일치하지 않습니다.
                            </div>
                        )) ||
                            (error === "user_already_exists" && (
                                <div className="w-full alert alert-error alert-soft alert-vertical">
                                    이미 존재하는 사용자입니다.
                                </div>
                            )) || (
                                <div className="w-full alert alert-error alert-soft alert-vertical">
                                    알 수 없는 오류가 발생했습니다.
                                </div>
                            ))}
                    <input
                        name="email"
                        type="email"
                        className="input w-full"
                        placeholder="이메일"
                        onChange={(e) => (email.current = e.target.value)}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        className="input w-full"
                        placeholder="비밀번호"
                        onChange={(e) => (password.current = e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={pending}
                    >
                        {!pending
                            ? loginRegisterText
                            : `${loginRegisterText} 중...`}
                    </button>
                    {pageType === "login" ? (
                        <div>
                            계정이 없으신가요?{" "}
                            <span
                                className="hover:cursor-pointer text-primary"
                                onClick={() => setPageType("register")}
                            >
                                회원가입
                            </span>
                        </div>
                    ) : (
                        <div>
                            계정이 있으신가요?{" "}
                            <span
                                className="hover:cursor-pointer text-primary"
                                onClick={() => setPageType("login")}
                            >
                                로그인
                            </span>
                        </div>
                    )}
                </div>
            </form>
        </main>
    );
}
