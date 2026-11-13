import { useReducer } from "react";
import { userReducer } from "../reducers";
import { useCallback } from "react";
import { useMemo } from "react";
import { UserContext } from "./contexts";

export function UserProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, {
        name: "ABCD",
        email: "a@a.com",
    });
    const changeName = useCallback((name) => {
        dispatch({ type: "name", payload: name });
    }, []);
    const changeEmail = useCallback((email) => {
        dispatch({ type: "email", payload: email });
    }, []);
    const value = useMemo(
        () => ({
            user,
            changeName,
            changeEmail,
        }),
        [changeEmail, changeName, user],
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
