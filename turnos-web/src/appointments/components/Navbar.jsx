import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { Profile } from '../../svgs/Profile';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useEffect, useRef, useState } from 'react';
import { Logout } from '../../svgs/Logout';
import { useAuthContext } from '../../hooks';
import { useMemo } from 'react';

export const Navbar = () => {
    
    const { logout, user } = useAuthContext();
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
    
    const date = useMemo(() => {
        const splittedDate = user.created_at.split('-');
        const formattedDate = {
            year: splittedDate[0],
            month: splittedDate[1],
            day: splittedDate[2].split('T')[0]
        }

        return `${formattedDate.day}/${formattedDate.month}/${formattedDate.year}`
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
                    <span className={ styles.userDropdownName }>{ user.name } { user.surname }</span>
                    <span className={ styles.userDropdownSince }>Desde { date }</span>
                    <button className={ styles.userDropdownItem }>
                        <Profile width={ 15 } height={ 15 } />
                        Mi perfil
                    </button>
                    <button className={ styles.userDropdownItem }>
                        <Calendar width={ 15 } height={ 15 } />
                        Mis reservas
                    </button>
                    <button onClick={ () => logout() } className={ styles.userDropdownItem }>
                        <Logout width={ 15 } height={ 15 } />
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}