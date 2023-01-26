import { useParams } from 'react-router-dom';
import styles from '../../styles/appointments/pages/ShopPage.module.css';

export const ShopPage = () => {

    const { shopId } = useParams();

    return (
        <div className={ styles.container }>
            { shopId }
        </div>
    )
}