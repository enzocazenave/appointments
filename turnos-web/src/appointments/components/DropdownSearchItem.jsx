import { Link } from 'react-router-dom';
import styles from '../../styles/appointments/components/Navbar.module.css';

export const DropdownSearchItem = ({ id, image, name, location, resetForm }) => {
    return (
        <Link 
            className={ styles.dropdownSearchItem } 
            to={`/shop/${ id }`}
            onClick={ () => resetForm('') }
        >
            <img className={ styles.dropdownSearchItemImage } src={ image } />
            <div className={ styles.dropdownSearchItemText }>
                <span className={ styles.dropdownSearchItemTextName }>
                    { name }
                </span>
                <p className={ styles.dropdownSearchItemTextLocation }>
                    { location }
                </p>
            </div>
        </Link>
    ) 
}