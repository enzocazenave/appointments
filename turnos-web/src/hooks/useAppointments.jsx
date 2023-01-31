import { addMinutes } from "date-fns";
import { useContext } from "react";
import { useState } from "react"
import turnos from "../api/turnos"
import { CalendarContext } from "../context/CalendarContext";
import { useAuthContext } from "./useAuthContext";

export const useAppointments = () => {

    const { user } = useAuthContext();
    const { appointments, setAppointments } = useContext(CalendarContext);
    const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
    const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

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
            setIsCreatingAppointment(false);
            return error.response.data;
        }        
    }

    const getAllAppointmentsById = async(id) => {
        setIsLoadingAppointments(true);

        try {   
            const { data } = await turnos.get(`/shops/calendar/${ id }`);
            setAppointments(data.appointments.map(appointment => {
                appointment.start = new Date(appointment.start);
                appointment.end = new Date(appointment.end);
                return appointment;
            }));

        } catch(error) {
            console.log(error);
            setIsLoadingAppointments(false);
        }

        setIsLoadingAppointments(false);
    }

    return {
        //* METODOS
        createAppointment,
        getAllAppointmentsById,

        //* PROPIEDADES
        isCreatingAppointment,
        appointments
    }
}
