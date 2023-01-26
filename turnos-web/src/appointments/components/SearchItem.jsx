import { Link } from 'react-router-dom';
import styles from '../../styles/appointments/components/SearchItem.module.css';

export const SearchItem = ({ id, url = '', title, text }) => {
    return (
        <Link 
            to={`/shop/${id}`} 
            className={ styles.searchDropdownItem }
        >
            <img 
                className={ styles.searchDropdownItemImage }
                src={ url }
            />
            <div
                className={ styles.searchDropdownItemInfo }
            >
                <span className={ styles.searchDropdownItemTitle }>{ title }</span>
                <p className={ styles.searchDropdownItemText }>{ text }</p>
            </div>
        </Link>
    );
}