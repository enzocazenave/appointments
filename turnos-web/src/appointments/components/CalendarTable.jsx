import { useEffect } from "react";
import { Calendar } from "react-big-calendar";
import { getMessagesES, localizer } from "../../helpers";
import { useAppointments, useAuthContext } from "../../hooks";
import { CalendarEvent } from "./";

export const CalendarTable = ({ calendarId }) => {

    const { getAllAppointmentsById, appointments} = useAppointments();
    const { user } = useAuthContext();

    useEffect(() => {
        getAllAppointmentsById(calendarId);
    }, [calendarId]);

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = event.user_id === user._id;
        const currentDate = new Date();
        let backgroundColorToShow = '';
        

        if (isMyEvent) backgroundColorToShow = isSelected ? '#009669' : '#00CC8F';
        if (!isMyEvent) backgroundColorToShow = isSelected ? '#a30000' : '#bc0000';
        if (currentDate > end) backgroundColorToShow = isSelected ? '#616161' : '#969696';
        if (currentDate > start && currentDate < end) backgroundColorToShow = '';
    
        const style = {
            backgroundColor: backgroundColorToShow,
            borderRadius: '4px',
            border: '1px solid #000',
            opacity: 0.8,
            color: '#F0F0F0'
        }
    
        return {
            style
        }
    }
    
    //isSelected ? '#009669' : '#00CC8F',

    return (
        <Calendar
            culture="es"
            localizer={ localizer }
            events={ appointments }
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