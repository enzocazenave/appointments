import { useEffect, useState } from "react"
import turnos from "../api/turnos";

export const useManagement = ({ shopId }) => {
   
    const [appointmentsTotalCount, setAppointmentsTotalCount] = useState(0);
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        getAppointmentsTotalCount(shopId)
            .then(setAppointmentsTotalCount);
    }, [shopId]);

    useEffect(() => {
        getCalendarsWithAppointments(shopId)
            .then(setCalendars);
    }, [shopId]);
   
    const getAppointmentsTotalCount = async(shopId) => {
        try {
            const { data } = await turnos.get(`/shops/${ shopId }/appointments`);
            
            return data.appointments;
        } catch(error) {
            console.log(error);
        }
    }

    const getCalendarsWithAppointments = async(shopId) => {
        try {
            const { data } = await turnos.get(`/shops/${ shopId }/calendarsWithAppointments`);

            return data.calendars;
        } catch(error) {
            console.log(error);
        }
    }

    return {
        appointmentsTotalCount,
        calendars
    }
}
