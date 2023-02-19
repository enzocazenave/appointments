import { useEffect, useState } from "react"
import turnos from "../api/turnos";

export const useManagement = ({ shopId }) => {
   
    const [appointments, setAppointments] = useState(0);
    const [calendars, setCalendars] = useState([]);
    const [loading, setLoading] = useState({
        appointments: false,
        calendars: false
    });

    useEffect(() => {
        getAppointmentsTotalCount(shopId)
            .then(data => {
                setAppointments(data);
                setLoading((prevState) => ({...prevState, appointments: true }));
            });
    }, [shopId]);

    useEffect(() => {
        getCalendarsWithAppointments(shopId)
            .then(data => {
                setCalendars(data);
                setLoading((prevState) => ({...prevState, calendars: true }));
            });
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
        appointments,
        calendars,
        loading: !Object.values(loading).every(item => item === true)
    }
}
