import styles from '../../styles/panel/components/Navbar.module.css';
import { Bell } from '../../svgs';
import { Avatar } from './Avatar';

export const Navbar = () => {
    return (
        <nav className={ styles.container }>
            <Bell />
            <Avatar />
        </nav>
    )
}