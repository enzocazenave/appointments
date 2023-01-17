import { Link } from 'react-router-dom';
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

            <div>
                <h1 className={ styles.title }>Algunos comercios adheridos</h1>

                <div className={ styles.shops }>
                    <Link
                        to="/shop/1"
                        className={ styles.shop }
                        style={{
                            background: 'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(https://b2743180.smushcdn.com/2743180/wp-content/uploads/sites/10/2022/03/descarga-2.jpeg?lossy=1&strip=1&webp=1)'
                        }}
                    >
                        <h2>Sizo Gerard</h2>
                    </Link>
                    <Link 
                        to="/shop/2"
                        className={ styles.shop }
                        style={{
                            background: 'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(https://assets.iprofesional.com/assets/jpg/2022/06/538177.jpg)'
                        }}
                    >
                        <h2>Lavadero Mitre</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}