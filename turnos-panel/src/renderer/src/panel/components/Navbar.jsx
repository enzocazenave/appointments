import { useState } from 'react';
import styles from '../../styles/panel/components/Navbar.module.css';
import { Bell, BellRinging } from '../../svgs';
import { Avatar } from './Avatar';

export const Navbar = () => {
    
    const [notifications, setNotifications] = useState([]);

    return (
        <nav className={ styles.container }>
            { (notifications.length == 0) 
                ? <Bell /> 
                : <BellRinging /> 
            }
            <Avatar />
        </nav>
    )
}