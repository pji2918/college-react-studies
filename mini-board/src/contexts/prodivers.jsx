import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { SessionContext } from "./contexts";

export default function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [ready, setReady] = useState(false);
    const user = session !== null ? session.user : null;

    useEffect(() => {
        // INITIAL_SESSION 이벤트로 저장된 세션도 전달받습니다.
        // 이 콜백에서는 다른 Supabase 요청을 await하지 않습니다.
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            setReady(true);
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <SessionContext.Provider value={{ user, ready }}>
            {children}
        </SessionContext.Provider>
    );
}
