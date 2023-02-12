import styles from '../../styles/panel/pages/Calendars.module.css';

export const Calendars = () => {
    return (
        <div className={ styles.container }>
            <header className={ styles.header }>
                <div className={ styles.headerLeft }>
                    <h1 className={ styles.headerTitle }>Calendarios</h1>
                    <span className={ styles.headerUrl }>Sizo Gerard {'>'} Calendarios</span>
                </div>
            </header>
        </div>
    )
}   
