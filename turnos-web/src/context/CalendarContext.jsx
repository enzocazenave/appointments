import { createContext } from "react";

export const CalendarContext = createContext({});

export const CalendarProvider = ({ children }) => {
    return (
        <CalendarContext.Provider
            value={{

            }}
        >
            { children }
        </CalendarContext.Provider>
    )
}