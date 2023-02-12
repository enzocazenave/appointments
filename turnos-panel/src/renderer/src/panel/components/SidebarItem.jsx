import { NavLink } from "react-router-dom";
import styles from '../../styles/panel/components/SidebarItem.module.css';

const active = {
    backgroundColor: '#e7e7e7'
}

export const SidebarItem = ({ to, icon, text }) => {
    return (
        <NavLink
            className={ styles.navItem }
            style={ ({ isActive }) => isActive ? active : {} }
            to={ to }
        >   
                { icon }
                { text }
        </NavLink>
    )
}