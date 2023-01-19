import { useParams } from 'react-router-dom';
import { shops } from '../data/shops';
import styles from '../../styles/appointments/pages/ShopPage.module.css';

const getShop = (shopId) => {
    return shops.filter(shop => shop.id === parseInt(shopId));
}

export const ShopPage = () => {

    const { shopId } = useParams();

    return (
        <div className={ styles.container }>
            
        </div>
    )
}