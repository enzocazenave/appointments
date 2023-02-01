import { useAuthContext } from "../../hooks"

export const CalendarEvent = ({ event }) => {

    const { user } = useAuthContext();

    return (
        <div>
            <strong>{
                (event.user_id === user._id)
                ? 'Tu reserva'
                : 'Reservado'    
            }</strong>
        </div>
    )
}