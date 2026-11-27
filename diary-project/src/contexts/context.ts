import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export type Session = {
    user: User | null;
    ready: boolean;
};

export const SessionContext = createContext<Session>({
    user: null,
    ready: false,
});
