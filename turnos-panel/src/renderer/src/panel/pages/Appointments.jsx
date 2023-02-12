import styles from '../../styles/panel/pages/Appointments.module.css';
import { HeaderPage } from '../components';

export const Appointments = () => {
    return (
        <div className={ styles.container }>
            <HeaderPage title="Turnos" showButton />
        </div>
    )
}