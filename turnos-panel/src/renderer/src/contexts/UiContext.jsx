import { createContext, useState } from "react";

export const UiContext = createContext({});

export const UiProvider = ({ children }) => {

    const [notifications, setNotifications] = useState({
        left: [],
        center: [],
        right: []
    });

    const removeNotification = (id, location) => {
        setNotifications((prevNotifications) => {
            return {
                ...prevNotifications,
                [location]: prevNotifications[location].filter(notification => notification.id !== id)
            }
        });
    }

    const createNotification = (text, type, duration, location) => {
        setNotifications((prevNotifications) => {
            const newNotification = {
                id: prevNotifications[location].length,
                text,
                type,
                duration,
                location
            }

            return {
                ...prevNotifications,
                [location]: [ ...prevNotifications[location], newNotification ]
            }
        })
    }

    return (
        <UiContext.Provider
            value={{
                notifications,
                removeNotification,
                createNotification
            }}
        >
            { children }
        </UiContext.Provider>
    )
}