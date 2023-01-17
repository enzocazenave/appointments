import styles from '../../styles/appointments/pages/HomePage.module.css';
import { Calendar } from '../../svgs/Calendar';
import { Shop } from '../../svgs/Shop';
import { UserIcon } from '../../svgs/UserIcon';
import { DataItem } from '../components';

export const HomePage = () => {
    return (
        <div className={ styles.container }>
            <div className={ styles.dataContainer }>
                <DataItem title="Comercios adheridos" icon={ <Shop width={ 60 } height={ 60 } /> }  data={ 6 } />
                <DataItem title="Turnos reservados" icon={ <Calendar width={ 50 } height={ 50 } /> } data={ 1239 }  />
                <DataItem title="Usuarios creados" icon={ <UserIcon width={ 50 } height={ 50 } /> }  data={ 357 } />
            </div>
        </div>
    )
}