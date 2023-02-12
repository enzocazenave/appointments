import styles from '../../styles/panel/pages/Settings.module.css';

export const Settings = () => {
    return (
        <div className={ styles.container }>
            <header className={ styles.header }>
                <div className={ styles.headerLeft }>
                    <h1 className={ styles.headerTitle }>Configuración</h1>
                    <span className={ styles.headerUrl }>Sizo Gerard {'>'} Configuración</span>
                </div>

                <button className={ styles.headerButton }>Crear reporte</button>
            </header>
        </div>
    )
}