import styles from '../../styles/panel/components/ManagementCalendar.module.css';
import { Avatar } from './Avatar';

export const ManagementCalendar = ({ image, name, appointmentsCount }) => {
    return (
       <div className={ styles.calendar }>
            <div className={ styles.calendarLeft }>
                <Avatar src={ image } width='30px' height='30px'/>
                <span>{ name }</span>
            </div>
            <span>{ appointmentsCount }</span>
        </div>
    )
}
