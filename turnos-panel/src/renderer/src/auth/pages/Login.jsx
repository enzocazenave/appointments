import { useContext, useEffect } from 'react';
import { UiContext } from '../../contexts/UiContext';
import { useForm } from '../../hooks';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from '../../styles/auth/pages/Login.module.css';
import { Calendar } from '../../svgs';

const loginForm = {
    username: '',
    password: ''
}

export const Login = () => {

    const { username, password, onInputChange } = useForm(loginForm);
    const { error, authenticateUser, resetErrorMessage } = useAuthContext();
    const { createNotification } = useContext(UiContext); 

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser({ username, password }, 'login');
    }

    useEffect(() => {
        if (error === undefined) return;
        createNotification(error, 'error', 3000, 'right');
        resetErrorMessage();
    }, [error]);

    return (
        <div className={ styles.container }>
            <div className={ styles.navbar }>
                <Calendar fill={ "#F0F0F0" } width={ 35 } height={ 35 } />
                <span className={ styles.navbarText }>Turnate</span>    
            </div>

            <form 
                className={ styles.form }
                onSubmit={ handleSubmit }
            >
                <div className={ styles.formText }>
                    <h1 className={ styles.title }>Iniciá sesión en tu cuenta</h1>
                    <p className={ styles.subTitle }>Gestioná todos los turnos reservados en tu comercio.</p>
                </div>
                <input
                    className={ styles.input }
                    placeholder="Nombre de usuario"
                    type="text"
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                />
                <input
                    className={ styles.input }
                    placeholder="Contraseña"
                    type="password"
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                />

                <button
                    type="submit"
                    className={ styles.button }
                >
                    Iniciar sesión
                </button>
            </form>

            <div></div>
        </div>
    ) 
}