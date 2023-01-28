import { Calendar } from "react-big-calendar";
import { eventStyleGetter, getMessagesES, localizer } from "../../helpers";
import { CalendarEvent } from "./";

export const CalendarTable = ({ calendarId }) => {
    return (
        <Calendar
            culture="es"
            localizer={ localizer }
            events={ [{
                start: new Date('2023-01-31T13:00:00.000Z'),
                end: new Date('2023-01-31T13:15:00.000Z'),
                title: 'Peluqueria'
            }, {
                start: new Date('2023-01-31T13:15:00.000Z'),
                end: new Date('2023-01-31T13:30:00.000Z'),
                title: 'Peluqueria'
            },{
                start: new Date('2023-01-31T13:30:00.000Z'),
                end: new Date('2023-01-31T13:45:00.000Z'),
                title: 'Peluqueria'
            }, {
                start: new Date('2023-01-31T13:45:00.000Z'),
                end: new Date('2023-01-31T14:00:00.000Z'),
                title: 'Peluqueria'
            }] }
            scrollToTime={ '15:00' }
            timeslots={1}
            step={ 15 }
            defaultView={ 'month' }
            startAccessor="start"
            endAccessor="end"
            style={{ height: '56vh' }}
            messages={ getMessagesES() }
            eventPropGetter={ eventStyleGetter }
            components={{
                event: CalendarEvent
            }}
        />
    ) 
}