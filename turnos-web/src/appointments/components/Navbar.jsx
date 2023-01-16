import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { UserIcon } from '../../svgs/UserIcon';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useForm } from '../../hooks';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Profile } from '../../svgs/Profile';
import { Logout } from '../../svgs/Logout';
import { DropdownSearchItem } from './';

const imageTest = 'data:image/png;base64,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';

const initialForm = {
    shop: ''
}

export const Navbar = () => {

    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSearchDropDownOpen, setIsSearchDropdownOpen] = useState(false);
    const menuRef = useRef();
    const { shop, onInputChange } = useForm(initialForm);

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

            <div 
                className={ styles.searchBar }>
                <input 
                    className={ styles.searchBarInput } 
                    type="text" 
                    placeholder="Buscá tu comercio"
                    name="shop"
                    value={ shop }
                    onChange={ onInputChange }
                    onFocus={ () => setIsSearchDropdownOpen(true) }
                    onBlur={ () => setIsSearchDropdownOpen(false) }
                />

                <MagnifyingGlass width={ 20 } height={ 20 } />

                <div className={ `${ styles.dropdownSearch } ${ isSearchDropDownOpen ? styles.active : styles.inactive }` }>
                    <DropdownSearchItem image={ imageTest } name="Sizo Gerard" location="Calle 13 entre 140 y 141" />
                    <DropdownSearchItem image={ imageTest } name="Sizo Gerard" location="Calle 13 entre 140 y 141" />
                </div>
            </div>

            <div 
                className={ styles.user }
                ref={ menuRef }
            >
                <div 
                    className={ styles.userTrigger } 
                    onClick={ () => setIsUserDropdownOpen(!isUserDropdownOpen) }
                >
                    <UserIcon width={ 25 } height={ 25 } fill="rgb(244,233,233)" />
                    <span className={ styles.username }>Enzo Cazenave</span>
                </div>
                
                <div 
                    className={ `${ styles.dropdownMenu } ${ isUserDropdownOpen ? styles.active : styles.inactive }` }
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

