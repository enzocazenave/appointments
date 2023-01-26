import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { Profile } from '../../svgs/Profile';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useEffect, useRef, useState } from 'react';
import { Logout } from '../../svgs/Logout';
import { useAuthContext } from '../../hooks';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SearchItem } from './SearchItem';

export const Navbar = () => {
    
    const { logout, user } = useAuthContext();
    const [active, setActive] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const userDropdownRef = useRef();
    const searchDropdownRef = useRef();
    
    useEffect(() => {
        const handleDropdown = (e) => {
            if (!userDropdownRef.current.contains(e.target)) setIsUserDropdownOpen(false);
            if (!searchDropdownRef.current.contains(e.target)) setIsSearchDropdownOpen(false);
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
            <Link to="/">
                <Calendar width={ 30 } height={ 30 } fill={ '#00CC8F' } /> 
            </Link>

            <div className={ styles.right }> 
                <div className={ styles.rightSearchBar }>
                    <input 
                        className={ styles.rightInput } 
                        type="text" 
                        placeholder="Buscá un comercio" 
                        onFocus={ () => setIsSearchDropdownOpen(true) }
                    />
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
                    ref={ searchDropdownRef }                
                    className={ `${ styles.searchDropdown } ${ isSearchDropdownOpen ? (active ? styles.activeBigger : styles.active ) : styles.inactive } ` }
                >   
                    <SearchItem 
                        id={1}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={2}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={3}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={4}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={5}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={6}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={7}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={8}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem 
                        id={9}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                    <SearchItem
                        id={10}
                        title="Sizo Gerard" 
                        text="Berazategui, Buenos Aires." 
                        url="https://insidemdp.com.ar/wp-content/uploads/2022/12/peluquerias-mar-del-plata.png" 
                    />
                </div>

                <div 
                    ref={ userDropdownRef } 
                    className={ `${styles.userDropdown} ${ isUserDropdownOpen ? (active ? styles.activeBigger : styles.active) : styles.inactive }` }
                >
                    <span className={ styles.userDropdownName }>{ user.name } { user.surname }</span>
                    <span className={ styles.userDropdownSince }>Desde { date }</span>
                    <Link 
                        to="/profile"
                        className={ styles.userDropdownItem }
                    >
                        <Profile width={ 15 } height={ 15 } />
                        Mi perfil
                    </Link>
                    <Link 
                        to="/appointments"
                        className={ styles.userDropdownItem }
                    >
                        <Calendar width={ 15 } height={ 15 } />
                        Mis reservas
                    </Link>
                    <button onClick={ () => logout() } className={ `${styles.userDropdownItem} ${ styles.userDropdownItemButton }` }>
                        <Logout width={ 15 } height={ 15 } />
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}