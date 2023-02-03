import { useState } from "react";
import { useAuthContext } from "../../hooks";
import styles from '../../styles/appointments/components/CalendarEvent.module.css';

export const CalendarEvent = ({ event }) => {
    const { user } = useAuthContext();
    const [view] = useState(localStorage.getItem('@appointments:lastView') || 'week');
    const { start, end } = event;
    const startHour =  `${ start.getHours() }:${ start.getMinutes() === 0 ? start.getMinutes().toString() + "0" : start.getMinutes() }`;
    const endHour = `${ end.getHours() }:${ end.getMinutes() === 0 ? end.getMinutes().toString() + "0" : end.getMinutes() }`;

    return (
        <div className={ `${styles.container} ${ (view === 'month') && styles.padding }` }>
            <strong>{
                (event.user_id === user._id)
                ? 'Tu reserva'
                : 'Reservado'    
            }</strong>
            {(view === 'month') && <span>{ startHour } - { endHour } </span>}
        </div>
    )
}