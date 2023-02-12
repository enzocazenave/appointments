import styles from '../../styles/panel/components/Navbar.module.css';
import { Bell } from '../../svgs';

export const Navbar = () => {
    return (
        <nav className={ styles.container }>
            <Bell />
            <img className={ styles.image } src="https://avatars.githubusercontent.com/u/102680110?v=4" alt="" />
        </nav>
    )
}