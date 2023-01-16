import styles from '../../styles/appointments/components/Navbar.module.css';

export const DropdownSearchItem = ({ image, name, location }) => {
    return (
        <div className={ styles.dropdownSearchItem }>
            <img className={ styles.dropdownSearchItemImage } src={ image } />
            <div className={ styles.dropdownSearchItemText }>
                <span className={ styles.dropdownSearchItemTextName }>
                    { name }
                </span>
                <p className={ styles.dropdownSearchItemTextLocation }>{ location }</p>
            </div>
        </div>
    ) 
}
