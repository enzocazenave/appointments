import { Link } from 'react-router-dom';
import styles from '../../styles/auth/pages/RegisterPage.module.css';
import { Calendar } from '../../svgs/Calendar';
import { motion } from 'framer-motion';
import { ErrorBox, Loader } from '../components/';
import { useAuthContext, useForm } from '../../hooks';
import { useEffect } from 'react';
import { useState } from 'react';

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

const initialForm = {
    name: '',
    surname: '',
    dni: '',
    email: '',
    password: '',
    code: ''
}

export const RegisterPage = () => {

    const { name, surname, dni, email, password, code, onInputChange } = useForm(initialForm);
    const { status, error, registerUser, resetErrorMessage, checkIfCanCreateUser, isLoadingVerifyEmail } = useAuthContext();
    const [page, setPage] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        checkIfCanCreateUser({ name, surname, dni, email, password }).then(res => {
            if (res) {
                resetErrorMessage();
                setPage(1);
            };
        });
    }

    const handleSubmitCode = (e) => {
        e.preventDefault();
        registerUser({ name, surname, dni, email, password, code });
    }

    useEffect(() => {
        resetErrorMessage()
    }, []);

    return (
        <motion.div 
            className={ styles.container }
            variants={ animations }
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.7 }}
        >
            <div className={ styles.right }>
                <h1 className={ styles.rightTitle }>Si ya tienes una cuenta</h1>
                <p className={ styles.rightText }>Iniciá sesión y reservá tu turno en tu comercio favorito!</p>
                <Link to="/auth/login" className={ styles.rightAnchor }>Iniciá sesión</Link>
            </div>

            <div className={ styles.left }>
                <div className={ styles.leftUp }>
                    <Calendar width={ 35 } height={ 35 } />
                    <span className={ styles.leftUpText }>Turnate</span>
                </div>
                {
                    (page === 0)
                    ? (
                        <div className={ styles.leftCenter }>
                            <h1 className={ styles.leftCenterTitle }>Crea tu cuenta</h1>
                            <form 
                                className={ styles.leftCenterForm }
                                onSubmit={ handleSubmit }
                            >
                                <input
                                    className={ styles.leftCenterFormInput }
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={ name }
                                    onChange={ onInputChange }
                                />
                                <input
                                    className={ styles.leftCenterFormInput }
                                    type="text"
                                    name="surname"
                                    placeholder="Apellido"
                                    value={ surname }
                                    onChange={ onInputChange }
                                />
                                 <input
                                    className={ styles.leftCenterFormInput }
                                    type="number"
                                    name="dni"
                                    placeholder="Documento nacional de identidad (DNI)"
                                    value={ dni }
                                    onChange={ onInputChange }
                                />
                                <input
                                    className={ styles.leftCenterFormInput }
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={ email }
                                    onChange={ onInputChange }
                                />
                                <input 
                                    className={ styles.leftCenterFormInput }
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={ password }
                                    onChange={ onInputChange }
                                />
                                <button
                                    className={ styles.leftCenterFormSubmit }
                                    type="submit"
                                >   
                                    Crear cuenta
                                </button>
                                {
                                    (error)
                                    ? <ErrorBox error={ error } />                        
                                    : <div className={ styles.leftCenterFormErrorSimulate }></div>
                                }
                                { (status === 'checking' || isLoadingVerifyEmail) && <Loader /> }
                            </form>
                        </div>
                    )
                    : (
                        <div className={ styles.leftCenter }>
                            <h1 className={ styles.leftCenterTitle }>Verificá el correo electrónico</h1>
                            <span className={ styles.leftCenterText }>Hemos enviado un código de verificación a { email }</span>
                            <form 
                                className={ styles.leftCenterForm }
                                onSubmit={ handleSubmitCode }
                            >
                                 <input
                                    className={ styles.leftCenterFormInputCode }
                                    type="number"
                                    name="code"
                                    placeholder="_ _ _ _ _ _"
                                    value={ code }
                                    onChange={ (e) => {
                                        if (code.length === 6 && e.nativeEvent.data) return;
                                        onInputChange(e);
                                    }}
                                />
                                <button
                                    className={ `${styles.leftCenterFormSubmit} ${(code.length !== 6) && styles.disabled}` }
                                    type="submit"
                                    disabled={ code.length !== 6 }
                                >   
                                    Verificar
                                </button>
                                <button
                                    className={ styles.leftCenterFormSubmitRed }
                                    type="button"
                                    onClick={ () => {
                                        setPage(0);
                                    }}
                                >   
                                    Volver
                                </button>
                                {
                                    (error)
                                    ? <ErrorBox error={ error } />                        
                                    : <div className={ styles.leftCenterFormErrorSimulate }></div>
                                }
                                { status === 'checking' && <Loader /> }
                            </form>
                        </div>
                    )
                }
                    
                <div>
                    
                </div>
            </div>
        </motion.div>
    )
}