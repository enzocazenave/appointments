import { Loader } from '../../auth/components';
import styles from '../../styles/appointments/pages/LoadingPage.module.css';

export const LoadingPage = () => {
    return (
        <div className={ styles.container }>
            <Loader />
        </div>
    )
}