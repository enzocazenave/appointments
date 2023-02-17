import { useContext } from "react"
import turnos from "../api/turnos";
import { AuthContext } from "../contexts/AuthContext"
import { verifyCredentials } from "../helpers";

export const useAuthContext = () => {
    
    const { status, user, error, login, logout, setError, setIsChecking } = useContext(AuthContext);

    const authenticateUser = async(credentials, action) => {
        if (action !== 'login' && action !== 'register') return setError('Ocurrió un error desconocido.');
        const verificationResult = verifyCredentials(credentials);
        if (!verificationResult.ok) return setError(verificationResult.msg);

        setIsChecking();

        try {
            const { data } = await turnos.post(`/shops/${ action }`, credentials);
            delete data.ok;
            
            localStorage.setItem('@appointments_panel:token', data.token);
            login(data);
        } catch(error) {
            logout(error.response?.data?.msg);
        }
    }

    const resetErrorMessage = () => setError(undefined);
    
    return {
        status,
        user,
        error,
        logout,
        authenticateUser,
        resetErrorMessage
    }
}
