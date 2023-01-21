import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState('checking');
    const [user, setUser] = useState({});
    const [error, setError] = useState(undefined);

    return (
        <AuthContext.Provider value={{
            status,
            user,
            error,
            setStatus,
            setUser,
            setError
        }}>
            { children }
        </AuthContext.Provider>
    );
}