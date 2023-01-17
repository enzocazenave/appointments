import styles from '../../styles/appointments/components/DataItem.module.css';

export const DataItem = ({ icon, title, data }) => {
    return (
        <div className={ styles.container }>
            { icon }

            <div className={ styles.infoContainer }>
                <h1>{ title }</h1>
                <span>{ data }</span>
            </div>
        </div>
    )
}