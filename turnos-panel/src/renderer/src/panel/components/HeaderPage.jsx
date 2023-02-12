import styles from '../../styles/panel/components/HeaderPage.module.css';

export const HeaderPage = ({ title, showButton = false }) => {
    return (
        <header className={ styles.header }>
            <div className={ styles.headerLeft }>
                <h1 className={ styles.headerTitle }>{ title }</h1>
                <span className={ styles.headerUrl }>Sizo Gerard {'>'} { title }</span>
            </div>

            { (showButton) && <button className={ styles.headerButton }>Crear reporte</button> }
        </header>
    )
}