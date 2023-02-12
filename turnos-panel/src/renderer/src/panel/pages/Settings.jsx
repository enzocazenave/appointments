import styles from '../../styles/panel/pages/Settings.module.css';
import { HeaderPage } from '../components';

export const Settings = () => {
    return (
        <div className={ styles.container }>
            <HeaderPage title="Configuración" />
        </div>
    )
}