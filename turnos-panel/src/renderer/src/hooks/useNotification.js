import { useEffect, useRef, useState } from "react"
import turnos from "../api/turnos";
import { useAuthContext } from "./useAuthContext";

export const useNotification = () => {

    const [notifications, setNotifications] = useState([]);
    const [notificationsLoaded, setNotificationsLoaded] = useState(false);
    const [newNotifications, setNewNotifications] = useState(false);
    const [notificationsLimit, setNotificationsLimit] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useAuthContext();
    const dropdownRef = useRef();

    useEffect(() => {
        const handleDropdown = (e) => {
            if (!dropdownRef.current.contains(e.target)) setDropdownOpen(false);
        }

        document.addEventListener('mousedown', handleDropdown);
        
        return () => {
            document.removeEventListener('mousedown', handleDropdown);
        }
    }, []);

    useEffect(() => {
        getNotifications(notificationsLimit)
            .then(data => {
                setNotifications(data);
                setNotificationsLoaded(true);
            });
    }, []);

    const getNotifications = async(notificationsLimit) => {
        try {
            const { data } = await turnos.get(`/notifications/${user._id}?limit=${notificationsLimit}`);

            return data.notifications;
        } catch(error) {
            console.log(error);
        }
    }

    const handleDropdownOpen = () => {
        setDropdownOpen(true);
        setNewNotifications(false);
    }

    return {
        dropdownRef,
        dropdownOpen,
        handleDropdownOpen,
        newNotifications,
        notifications,
        notificationsLoaded
    }
}