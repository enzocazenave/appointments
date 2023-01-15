import { Link } from 'react-router-dom';
import styles from '../../styles/auth/pages/RegisterPage.module.css';
import { Calendar } from '../svg/Calendar';
import { motion } from 'framer-motion';
import { ErrorBox, Loader } from '../components/';
import { useForm } from '../../hooks';

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
    password: ''
}

export const RegisterPage = () => {

    const { name, surname, dni, email, password, onInputChange } = useForm(initialForm);

    const error = ''; // al rellenar esta variable se muestra el error en pantalla
    const isLoading = false; // al estar en true se muestra el spinner

    const handleSubmit = () => {

    } 

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
                    
                        { isLoading && <Loader /> }
                    </form>
                </div>

                <div>
                    
                </div>
            </div>
        </motion.div>
    )
}