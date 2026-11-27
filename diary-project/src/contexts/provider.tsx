import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { SessionContext } from "./context";

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [ready, setReady] = useState<boolean>(false);
    const user = session ? session.user : null;

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, nextSession) => {
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
