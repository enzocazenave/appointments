import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { Profile } from '../../svgs/Profile';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { Logout } from '../../svgs/Logout';
import { useNavbar } from '../../hooks';
import { Link } from 'react-router-dom';
import { SearchItem } from './SearchItem';

export const Navbar = () => {
    const { 
        active, 
        searchDropdownRef, 
        userDropdownRef, 
        isSearchDropdownOpen, 
        isUserDropdownOpen, 
        setIsSearchDropdownOpen, 
        setIsUserDropdownOpen, 
        filteredShops, 
        date, 
        name, 
        surname,
        logout,
        searchQuery,
        setSearchQuery
    } = useNavbar();

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
                        value={ searchQuery }
                        onChange={ ({ target }) => setSearchQuery(target.value) }
                    />
                    <MagnifyingGlass width={ 30 } height={ 30 } fill={ '#00CC8F' } />
                </div>

                <div className={ styles.rightUser } onClick={ () => setIsUserDropdownOpen(!isUserDropdownOpen) }>
                    <Profile width={ 30 } height={ 30 } fill={ '#00CC8F' } className={ styles.rightUserIcon } />
                </div>

                <div
                    ref={ searchDropdownRef }                
                    className={ `
                        ${ styles.searchDropdown } 
                        ${ isSearchDropdownOpen ? (active ? styles.activeBigger : styles.active ) : styles.inactive } 
                        ${ filteredShops.length === 0 && styles.searchDropdownFlexCenter }    
                    ` }
                >   
                    {  
                        (filteredShops.length > 0)
                        ? ( 
                            filteredShops.map(shop => (
                                   <SearchItem 
                                       key={ shop._id }
                                       id={ shop._id }
                                       title={ shop.title }
                                       text={ shop.estimated_location }
                                       url={ shop.image }
                                   />
                            ))
                        )
                        : <span className={ styles.noResults }>No hay resultados</span>
                    }
                </div>

                <div 
                    ref={ userDropdownRef } 
                    className={ `${styles.userDropdown} ${ isUserDropdownOpen ? (active ? styles.activeBigger : styles.active) : styles.inactive }` }
                >
                    <span className={ styles.userDropdownName }>{ name } { surname }</span>
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