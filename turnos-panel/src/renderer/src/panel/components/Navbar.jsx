import { useAuthContext } from '../../hooks';
import styles from '../../styles/panel/components/Navbar.module.css';
import { Avatar } from './Avatar';
import { NotificationsDropdown } from './NotificationsDropdown';

export const Navbar = () => {
    
    const { user } = useAuthContext();

    return (
        <nav className={ styles.container }>
            <NotificationsDropdown />
            <Avatar src={ user.image } />
        </nav>
    )
}