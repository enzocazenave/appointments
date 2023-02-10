import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = () => {

    const [status, setStatus] = useState('checking');
    const [user, setUser] = useState({});
    const [error, setError] = useState(undefined);

    const login = (data) => {
        setUser(data);
        setStatus('authenticated');
        setError(undefined);
    }

    const logout = (message = undefined) => {
        setUser({});
        setStatus('not-authenticated');
        setError(message);
        localStorage.removeItem('@panel:token');
    }

    const setIsChecking = () => {
        setStatus('checking');
    }

    return (
        <AuthContext.Provider value={{
            status,
            user,
            error,
            login,
            logout,
            setError,
            setIsChecking
        }}>
            { children }
        </AuthContext.Provider>
    )
}