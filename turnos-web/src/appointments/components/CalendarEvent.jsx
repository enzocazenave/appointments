import { useAuthContext } from "../../hooks"

export const CalendarEvent = ({ event }) => {

    const { user } = useAuthContext();

    return (
        <div
            style={{ with: 'fit-content' }}
        >
            <strong>{
                (event.user_id === user._id)
                ? 'Tu reserva'
                : 'Reservado'    
            }</strong>
        </div>
    )
}