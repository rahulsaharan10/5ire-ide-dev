import { useState, createContext } from "react";
export const UserContext = createContext();

export default function Context(props) {
    const [pass, setPass] = useState({ p1: "", p2: "" });
    const [passMatch, setPassmatch] = useState(false);

    const values = {
        pass,
        setPass,
        passMatch,
        setPassmatch
    }

    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    );
}
