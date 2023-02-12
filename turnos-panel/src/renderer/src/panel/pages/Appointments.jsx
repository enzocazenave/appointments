import styles from '../../styles/panel/pages/Appointments.module.css';

export const Appointments = () => {
    return (
        <div className={ styles.container }>
            <header className={ styles.header }>
                <div className={ styles.headerLeft }>
                    <h1 className={ styles.headerTitle }>Turnos</h1>
                    <span className={ styles.headerUrl }>Sizo Gerard {'>'} Turnos</span>
                </div>

                <button className={ styles.headerButton }>Crear reporte</button>
            </header>
        </div>
    )
}