import { useState } from "react";
import { useContext } from "react"
import turnos from "../api/turnos";
import { AuthContext } from "../context/AuthContext"
import { verifyCredentials } from "../helpers/verifyCredentials";

export const useAuthContext = () => {
    
    const { status, user, error, login, logout, setError, setIsChecking } = useContext(AuthContext);
    const [ isLoadingEmailChange, setIsLoadingEmailChange ] = useState(false);

    const authenticateUser = async(credentials, action) => {
        if (action !== 'login' && action !== 'register') return setError('Ocurrió un error desconocido.');
        const verificationResult = verifyCredentials(credentials);
        if (!verificationResult.ok) return setError(verificationResult.msg);
        
        setIsChecking();

        try {
            const { data } = await turnos.post(`/auth/${ action }`, credentials);
            delete data.ok;

            localStorage.setItem('@appointments:token', data.token);
            login(data);
        } catch(error) {
            logout(error.response.data.msg);
        }
    }

    const resetErrorMessage = () => setError(undefined);

    const changeUserEmail = async(email) => {
        const verificationResult = verifyCredentials({ email });
        if (!verificationResult.ok) return setError(verificationResult.msg);
        
        setIsLoadingEmailChange(true);

        try {
            const { data } = await turnos.post('/auth/email', { email });
            setIsLoadingEmailChange(false);
            return data;
        } catch(error) {
            setIsLoadingEmailChange(false);
            return error.response.data;
        }
    }

    const changeUserEmailConfirm = async(code, email) => {
        const verificationResult = verifyCredentials({ code, email });
        if (!verificationResult.ok) return setError(verificationResult.msg);

        setIsLoadingEmailChange(true);

        try {
            const { data } = await turnos.post('/auth/confirmEmail', { code, oldEmail: user.email, newEmail: email });
            delete data.ok;
            
            logout();
            localStorage.setItem('@appointments:token', data.token);
            login(data);
            setIsLoadingEmailChange(false);
            return true;
        } catch(error) {
            console.log(error);
            setIsLoadingEmailChange(false);
            return false;
        }
    }
    
    return {
        status,
        user,
        error,
        authenticateUser,
        logout,
        resetErrorMessage,
        changeUserEmail,
        changeUserEmailConfirm,
        isLoadingEmailChange
    }
}