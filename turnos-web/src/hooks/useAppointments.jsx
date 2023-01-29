import { addMinutes } from "date-fns";
import { useState } from "react"
import turnos from "../api/turnos"
import { useAuthContext } from "./useAuthContext";

export const useAppointments = () => {

    const { user } = useAuthContext();
    const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);

    const createAppointment = async(credentials, calendar) => {
        setIsCreatingAppointment(true);

        const { appointment, comment } = credentials;
        
        try {
            const { data } = await turnos.post(`/shops/${ calendar.shop_id }/${ calendar._id }`, {
                comment,
                user_id: user._id,
                appointment_date_start: appointment,
                appointment_date_end: addMinutes(new Date(appointment), 15)
            });

            setIsCreatingAppointment(false);
            return data;
        } catch(error) {
            console.error(error.response.data);
            setIsCreatingAppointment(false);
            return error.response.data;
        }
        
        
    }

    return {
        //* METODOS
        createAppointment,

        //* PROPIEDADES
        isCreatingAppointment
    }
}
