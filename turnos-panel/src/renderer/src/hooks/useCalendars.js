import { useContext, useEffect, useState } from "react"
import turnos from "../api/turnos";
import { AuthContext } from "../contexts/AuthContext";

export const useCalendars = () => {

    const [appointmentsDays, setAppointmentsDays] = useState([]);
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState({});
    const { user: { _id: shopId } } = useContext(AuthContext);

    useEffect(() => {
        turnos.get(`/shops/${shopId}/calendars`)
            .then(({ data }) => setCalendars(data.calendars));
    }, []);

    const changeAppointmentDay = (day) => {
        if (appointmentsDays.includes(day)) {
            setAppointmentsDays((prevState) => prevState.filter(state => state !== day));
            return;
        }

        setAppointmentsDays((prevState) => [...prevState, day]);
    }

    return {
        calendars,
        selectedCalendar,
        setSelectedCalendar,
        changeAppointmentDay,
        setAppointmentsDays,
        appointmentsDays
    }
}