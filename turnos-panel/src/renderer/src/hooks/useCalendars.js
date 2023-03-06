import { useState } from "react"

export const useCalendars = () => {

    const [appointmentsDays, setAppointmentsDays] = useState([]);

    const addAppointmentDay = (day) => {
        setAppointmentsDays((prevState) => [...prevState, day]);
    }

    return {
        addAppointmentDay
    }
}