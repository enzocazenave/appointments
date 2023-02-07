import { Link } from 'react-router-dom';
import styles from '../../styles/appointments/components/ShopSuggest.module.css';

export const ShopSuggest = ({ id, title, image }) => {
    return (
        <Link
            to={`/shop/${id}`}
            className={ styles.suggestItem }
            style={{
                background: `linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url(${ image })`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat'                        
            }}
        >
            <h3 className={ styles.suggestItemTitle }>
                { title }
            </h3>
        </Link>
    )
}