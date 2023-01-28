import { Link } from "react-router-dom"
import styles from '../../styles/appointments/components/CalendarsButton.module.css'

export const CalendarsButton = ({ shopId, calendar, calendarId }) => {
    return (
        <Link
            to={ `/shop/${ shopId }/${ calendar._id }` }
            className={`
                ${styles.calendarTitle} 
                ${(calendarId === calendar._id) ? styles.isSelected : ''}
            `}
        >   
            <img className={ styles.calendarImage } src={ calendar.image } />
            <span className={ styles.calendarTitleText }>{ calendar.name }</span>
        </Link>
    )
}