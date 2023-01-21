import styles from '../../styles/appointments/components/Navbar.module.css';
import { Calendar } from '../../svgs/Calendar';
import { Profile } from '../../svgs/Profile';
import { MagnifyingGlass } from '../../svgs/MagnifyingGlass';
import { useEffect, useState } from 'react';

export const Navbar = () => {

    const [active, setActive] = useState(false);

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
        <nav className={ `${styles.container} ${ active ? 'navbar_active' : '' }` } id="navmain">
            <Calendar width={ 30 } height={ 30 } fill={ '#00CC8F' } />

            <div className={ styles.right }> 
                <div className={ styles.rightSearchBar }>
                    <input className={ styles.rightInput } type="text" placeholder="Buscá un comercio" />
                    <MagnifyingGlass width={ 30 } height={ 30 } fill={ '#00CC8F' } />
                </div>

                <div className={ styles.rightUser }>
                    <Profile 
                        width={ 30 } 
                        height={ 30 } 
                        fill={ '#00CC8F' } 
                        className={ styles.rightUserIcon } 
                    />
                </div>
            </div>
        </nav>
    );
}