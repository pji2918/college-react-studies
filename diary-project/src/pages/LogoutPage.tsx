import { useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

export default function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logOut = async () => {
            await supabase.auth.signOut();
        };
        logOut();

        const timeout = setTimeout(
            () => navigate("/login", { replace: true }),
            3000,
        );
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <main className="flex items-center justify-center h-dvh bg-sky-100">
            <form className="md:card max-md:w-full max-md:h-full bg-white shadow-sm min-w-96 p-5">
                <div className="card-body flex flex-col gap-5 justify-center items-center">
                    <h1 className="card-title text-3xl font-bold">
                        로그아웃되었습니다.
                    </h1>
                    <p>3초 후 로그인 페이지로 이동합니다.</p>
                </div>
            </form>
        </main>
    );
}
