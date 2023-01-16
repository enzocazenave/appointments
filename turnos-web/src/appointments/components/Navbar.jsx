import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { UserIcon } from '../../svgs/UserIcon';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useForm } from '../../hooks';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Profile } from '../../svgs/Profile';
import { Logout } from '../../svgs/Logout';

const initialForm = {
    shop: ''
}

export const Navbar = () => {

    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { shop, onInputChange } = useForm(initialForm);
    const menuRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsUserDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    return (
        <div className={ styles.container }>
            <div className={ styles.brand }>
                <Calendar width={ 35 } fill="rgb(244, 233, 233)" height={ 35 } />
                <span className={ styles.brandText }>Turnate</span>
            </div>

            <div className={ styles.searchBar }>
                <input 
                    className={ styles.searchBarInput } 
                    type="text" 
                    placeholder="Buscá tu comercio"
                    name="shop"
                    value={ shop }
                    onChange={ onInputChange }
                />

                <MagnifyingGlass width={ 20 } height={ 20 } />
            </div>

            <div className={ styles.user }>
                <div 
                    className={ styles.userTrigger } 
                    onClick={ () => setIsUserDropdownOpen(!isUserDropdownOpen) }
                >
                    <UserIcon width={ 25 } height={ 25 } fill="rgb(244,233,233)" />
                    <span className={ styles.username }>Enzo Cazenave</span>
                </div>
                
                <div 
                    className={ `${ styles.dropdownMenu } ${ isUserDropdownOpen ? styles.active : styles.inactive }` }
                    ref={ menuRef }
                >
                    <button className={ styles.dropdownItem }>
                        <Profile width={ 30 } height={ 30 } />
                        Mi perfil
                    </button>
                    <button className={ styles.dropdownItem }>
                        <Calendar  width={ 20 } height={ 20 } />
                        Mis turnos
                    </button>
                    <button className={ styles.dropdownItem }>
                        <Logout width={ 20 } height={ 20 } />
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

