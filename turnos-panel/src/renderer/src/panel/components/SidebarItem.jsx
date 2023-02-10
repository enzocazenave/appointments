import { NavLink } from "react-router-dom";
import styles from '../../styles/panel/components/SidebarItem.module.css';

const active = {
    backgroundColor: '#00976a'
}

export const SidebarItem = ({ to, icon, text }) => {
    return (
        <NavLink
            className={ styles.navItem }
            style={ ({ isActive }) => isActive ? active : {} }
            to={ to }
        >   
            {'>'}
            <div className={ styles.navItemType }>
                { icon }
                { text }
            </div>
        </NavLink>
    )
}