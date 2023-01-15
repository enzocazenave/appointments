import { Link } from 'react-router-dom';
import styles from '../../styles/auth/pages/RegisterPage.module.css';
import { Calendar } from '../svg/Calendar';
import { motion } from 'framer-motion';
import { Error } from '../svg/Error';

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

export const RegisterPage = () => {
    const error = ''; // al rellenar esta variable se muestra el error en pantalla

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
                <p className={ styles.rightText }>Iniciá sesión y reserva tu turno en tu comercio favorito!</p>
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
                        />
                        <input
                            className={ styles.leftCenterFormInput }
                            type="text"
                            name="surname"
                            placeholder="Apellido"
                        />
                        <input
                            className={ styles.leftCenterFormInput }
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                        />
                        <input 
                            className={ styles.leftCenterFormInput }
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                        />

                        <button
                            className={ styles.leftCenterFormSubmit }
                            type="submit"
                        >   
                            Crear cuenta
                        </button>

                        {
                            (error)
                            ? (
                                <div className={ styles.leftCenterFormError }>
                                    <Error width={ 20 } height={ 20 } />
                                    <span>{ error }</span>
                                </div>              
                            )
                            : <div className={ styles.leftCenterFormErrorSimulate }></div>
                        }
                    </form>
                </div>

                <div>
                    
                </div>
            </div>
        </motion.div>
    )
}