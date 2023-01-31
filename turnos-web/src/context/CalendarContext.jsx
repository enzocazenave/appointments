import { createContext, useState } from "react";

export const CalendarContext = createContext({});

export const CalendarProvider = ({ children }) => {

    const [appointments, setAppointments] = useState([]);

    return (
        <CalendarContext.Provider
            value={{
                appointments,
                setAppointments
            }}
        >
            { children }
        </CalendarContext.Provider>
    )
}