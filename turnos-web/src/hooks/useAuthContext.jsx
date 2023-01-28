import { useState } from "react";
import { useContext } from "react"
import turnos from "../api/turnos";
import { AuthContext } from "../context/AuthContext"
import { verifyCredentials } from "../helpers";

export const useAuthContext = () => {
    
    const { status, user, error, login, logout, setError, setIsChecking } = useContext(AuthContext);
    const [ isLoadingEmailChange, setIsLoadingEmailChange ] = useState(false);
    const [ isLoadingVerifyEmail, setIsLoadingVerifyEmail ] = useState(false);

    const checkIfCanCreateUser = async(credentials) => {
        const verificationResult = verifyCredentials(credentials);
        if (!verificationResult.ok) return setError(verificationResult.msg);

        setIsLoadingVerifyEmail(true);

        try {
            const { data } = await turnos.post('/auth/register', {
                email: credentials.email,
                dni: credentials.dni
            });
            setIsLoadingVerifyEmail(false);
            return data.ok;
        } catch(error) {
            setIsLoadingVerifyEmail(false);
            logout(error.response.data.msg);
        }
    }

    const registerUser = async(credentials) => {
        const verificationResult = verifyCredentials(credentials);
        if (!verificationResult.ok) return setError(verificationResult.msg);

        setIsChecking();

        try {
            const { data } = await turnos.post('/auth/registerConfirm', credentials);
            delete data.ok;

            localStorage.setItem('@appointments:token', data.token);
            login(data);
        } catch(error) {
            logout(error.response.data.msg);
        }
    }

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
        registerUser,
        authenticateUser,
        logout,
        resetErrorMessage,
        changeUserEmail,
        changeUserEmailConfirm,
        isLoadingEmailChange,
        isLoadingVerifyEmail,
        checkIfCanCreateUser
    }
}