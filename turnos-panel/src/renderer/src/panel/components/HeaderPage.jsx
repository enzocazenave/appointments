import styles from '../../styles/panel/components/HeaderPage.module.css';
import { Refresh } from '../../svgs';

export const HeaderPage = ({ title, showButton = false, refreshFunction }) => {
    return (
        <header className={ styles.header }>
            <div className={ styles.headerLeft }>
                <h1 className={ styles.headerTitle }>{ title }</h1>
                <span className={ styles.headerUrl }>Sizo Gerard {'>'} { title }</span>
            </div>
            <div className={ styles.headerRight }>
                { (showButton) && <button className={ styles.headerButton }>Crear reporte</button> }
                { (refreshFunction) && 
                    <button 
                        className={ styles.refreshButton }
                        onClick={ refreshFunction }
                    >
                        <Refresh width={ 30 } />
                    </button> 
                }
            </div>
        </header>
    )
}