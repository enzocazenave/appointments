import { useContext, useEffect, useState } from "react"
import turnos from "../api/turnos";
import { AuthContext } from "../contexts/AuthContext";
import { UiContext } from "../contexts/UiContext";

export const useCalendars = () => {

    const [appointmentsDays, setAppointmentsDays] = useState([]);
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState({});
    const [loadingCalendars, setLoadingCalendars] = useState(true);
    const [creatingCalendar, setCreatingCalendar] = useState(false);
    const { user: { _id: shopId } } = useContext(AuthContext);
    const { createNotification } = useContext(UiContext);

    useEffect(() => {
        turnos.get(`/shops/${shopId}/calendars`)
            .then(({ data }) => setCalendars(data.calendars))
            .finally(() => setLoadingCalendars(false))
    }, []);

    const changeAppointmentDay = (day) => {
        if (appointmentsDays.includes(day)) {
            setAppointmentsDays((prevState) => prevState.filter(state => state !== day));
            return;
        }

        setAppointmentsDays((prevState) => [...prevState, day]);
    }

    const createCalendarAppointment = async(inputValues, appointmentsDays) => {
        const { name, description, appointments_frequency, first_time, second_time } = inputValues;
        
        try {
            const { data } = await turnos.post(`/shops/${ shopId }/calendars`, {
                shop_id: shopId,
                name,
                text: description,
                appointments_frequency: parseInt(appointments_frequency),
                appointments_days: appointmentsDays,
                min_time: {
                    hour: first_time.getHours(),
                    minute: first_time.getMinutes()
                },
                max_time: {
                    hour: second_time.getHours(),
                    minute: second_time.getMinutes()
                }
            });

            if (!data.ok) return;

            setCalendars(prevCalendars => [...prevCalendars, data.calendar]);
            setSelectedCalendar(data.calendar);
            setCreatingCalendar(false);
            createNotification(`El calendario ${ data.calendar.name } fue creado exitosamente.`, 'success', 2500, 'left')
        } catch(error) {

        }
    }       

    return {
        calendars,
        selectedCalendar,
        setSelectedCalendar,
        changeAppointmentDay,
        setAppointmentsDays,
        appointmentsDays,
        loadingCalendars,
        createCalendarAppointment,
        creatingCalendar,
        setCreatingCalendar,
    }
}