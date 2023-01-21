import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { Profile } from '../../svgs/Profile';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useEffect, useRef, useState } from 'react';
import { Logout } from '../../svgs/Logout';

export const Navbar = () => {

    const [active, setActive] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef();

    useEffect(() => {
        const handleDropdown = (e) => {
            if (!userDropdownRef.current.contains(e.target)) setIsUserDropdownOpen(false);
        }

        document.addEventListener('mousedown', handleDropdown);

        return () => {
            document.removeEventListener('mousedown', handleDropdown);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setActive(scrollY > (innerHeight / 2));
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <nav className={ `${styles.container} ${ active ? styles.containerActive : '' }` } id="navmain">
            <Calendar width={ 30 } height={ 30 } fill={ '#00CC8F' } /> 

            <div className={ styles.right }> 
                <div className={ styles.rightSearchBar }>
                    <input className={ styles.rightInput } type="text" placeholder="Buscá un comercio" />
                    <MagnifyingGlass width={ 30 } height={ 30 } fill={ '#00CC8F' } />
                </div>

                <div className={ styles.rightUser } onClick={ () => setIsUserDropdownOpen(!isUserDropdownOpen) }>
                    <Profile 
                        width={ 30 } 
                        height={ 30 } 
                        fill={ '#00CC8F' } 
                        className={ styles.rightUserIcon } 
                    />
                </div>

                <div 
                    ref={ userDropdownRef } 
                    className={ `${styles.userDropdown} ${ isUserDropdownOpen ? (active ? styles.activeBigger : styles.active) : styles.inactive }` }
                >
                    <button className={ styles.userDropdownItem }>
                        <Profile width={ 15 } height={ 15 } />
                        Mi perfil
                    </button>
                    <button className={ styles.userDropdownItem }>
                        <Calendar width={ 15 } height={ 15 } />
                        Mis reservas
                    </button>
                    <button className={ styles.userDropdownItem }>
                        <Logout width={ 15 } height={ 15 } />Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}