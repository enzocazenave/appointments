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

        const { appointment_date, appointment_hour, comment } = credentials;

        const appointment_date_start = {
            day: appointment_date.getDate(),
            month: appointment_date.getMonth(),
            year: appointment_date.getFullYear(),
            hour: appointment_hour.getHours(),
            minute: appointment_hour.getMinutes()
        }

        const appointment_date_end = structuredClone(appointment_date_start);
        appointment_date_end.minute += 15;

        if (appointment_date_end.minute === 60) {
            appointment_date_end.minute = 0;
            appointment_date_end.hour += 1;
        }
        
        try {
            const { data } = await turnos.post(`/shops/${ calendar.shop_id }/${ calendar._id }`, {
                comment,
                user_id: user._id,
                appointment_date_start,
                appointment_date_end
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
                const { day: startDay, month: startMonth, year: startYear, hour: startHour, minute: startMinute } = appointment.start;
                const { day: endDay, month: endMonth, year: endYear, hour: endHour, minute: endMinute } = appointment.end;

                appointment.start = new Date(startYear, startMonth, startDay, startHour, startMinute, 0);
                appointment.end = new Date(endYear, endMonth, endDay, endHour, endMinute, 0);
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
