import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { UserIcon } from '../../svgs/UserIcon';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Profile } from '../../svgs/Profile';
import { Logout } from '../../svgs/Logout';
import { DropdownSearchItem } from './';
import { shops } from '../data/shops';
import { Link } from 'react-router-dom';

const defaultUserImage = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';

export const Navbar = () => {

    const [searchInput, setSearchInput] = useState('');
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSearchDropDownOpen, setIsSearchDropdownOpen] = useState(false);
    const [searchedShops, setSearchedShops] = useState([]);
    const menuRef = useRef();

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        setSearchedShops(shops.filter(shop => shop.name.toLowerCase().includes(e.target.value.toLowerCase())));
        if (e.target.value == '') return setSearchedShops([]);
    }

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
            <div className={  styles.brand }>
                <Link to="/">
                    <Calendar width={ 35 } fill="#03b881" height={ 35 } />
                </Link>
            </div>
            

            <div className={ styles.searchBar }>
                <input 
                    className={ styles.searchBarInput } 
                    type="text" 
                    placeholder="Buscá tu comercio"
                    value={ searchInput }
                    onChange={ handleChange }
                    onFocus={ () => setIsSearchDropdownOpen(true) }
                    onBlur={ () => setIsSearchDropdownOpen(false) }
                />

                <MagnifyingGlass width={ 20 } height={ 20 } fill={ '#fff' } className={ styles.svg } />
                {
                    (searchInput !== '') && (
                        <div className={ `${ styles.dropdownSearch } ${ isSearchDropDownOpen ? styles.active : styles.inactive }` }>
                            {
                                (searchedShops.length > 0)
                                    ? searchedShops.map((shop) => (
                                        <DropdownSearchItem 
                                            key={ shop.id } 
                                            id={ shop.id } 
                                            image={ shop.image } 
                                            name={ shop.name } 
                                            location={ shop.location } 
                                            resetForm={ setSearchInput }
                                        />
                                    ))
                                    : <p style={{ padding: '1rem' }}>
                                        No hay resultados para su busqueda
                                    </p>
                            }
                        </div>
                    )
                }
            </div>

            <div 
                className={ styles.user }
                ref={ menuRef }
            >
                <div 
                    className={ styles.userTrigger } 
                    onClick={ () => setIsUserDropdownOpen(!isUserDropdownOpen) }
                >
                    {/*<UserIcon width={ 25 } height={ 25 } fill="rgb(244,233,233)" />
                    <span className={ styles.username }>Enzo Cazenave</span>*/}
                    <img src={ defaultUserImage } className={ styles.userImage } alt="Unknown user" />
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