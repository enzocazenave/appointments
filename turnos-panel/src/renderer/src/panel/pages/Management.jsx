import styles from '../../styles/panel/pages/Management.module.css';

export const Management = () => {
    return (
        <div className={ styles.container }>
            <header className={ styles.header }>
                <div className={ styles.headerLeft }>
                    <h1 className={ styles.headerTitle }>Gestión</h1>
                    <span className={ styles.headerUrl }>Sizo Gerard {'>'} Gestión</span>
                </div>

                <button className={ styles.headerButton }>Crear reporte</button>
            </header>
        </div>
    )
}
