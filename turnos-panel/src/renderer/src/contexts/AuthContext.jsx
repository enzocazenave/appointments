import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState('checking');
    const [user, setUser] = useState({});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        validateToken();
    }, []);

    const login = (data) => {
        setUser(data);
        setStatus('authenticated');
        setError(undefined);
    }

    const logout = (message = undefined) => {
        setUser({});
        setStatus('not-authenticated');
        setError(message);
        localStorage.removeItem('@appointmens_panel:token');
    }

    const setIsChecking = () => {
        setStatus('checking');
    }

    const validateToken = async() => {
        try {
            const { data } = await turnos.get('/shops/renew');

            if (!data.ok) return logout();
            delete data.ok;

            login(data);
        } catch(error) {
            logout();
        }
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