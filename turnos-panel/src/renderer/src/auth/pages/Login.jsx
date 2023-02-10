import { useForm } from '../../hooks';
import styles from '../../styles/auth/pages/Login.module.css';
import { Calendar } from '../../svgs';

const loginForm = {
    username: '',
    password: ''
}

export const Login = () => {

    const { username, password, onInputChange } = useForm(loginForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Login
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.navbar }>
                <Calendar fill={ "#F0F0F0" } width={ 35 } height={ 35 } />
                <span className={ styles.navbarText }>Turnate</span>    
            </div>

            <form className={ styles.form }>
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
                    onClick={ handleSubmit }
                >
                    Iniciar sesión
                </button>
            </form>

            <div></div>
        </div>
    ) 
}