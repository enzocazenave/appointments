export const CalendarEvent = ({ event }) => {

    const { title } = event;

    return (
        <div
            style={{ with: 'fit-content' }}
        >
            <strong>{title}</strong>

        </div>
    )
}