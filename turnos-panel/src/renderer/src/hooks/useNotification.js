import { useContext, useEffect, useRef, useState } from "react"
import turnos from "../api/turnos";
import { SocketContext } from "../contexts/SocketContext";
import { UiContext } from "../contexts/UiContext";
import { useAuthContext } from "./useAuthContext";

export const useNotification = () => {

    const [notifications, setNotifications] = useState([]);
    const [notificationsLoaded, setNotificationsLoaded] = useState(false);
    const [newNotifications, setNewNotifications] = useState(false);
    const [notificationsLimit, setNotificationsLimit] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useAuthContext();
    const dropdownRef = useRef();
    const { socket } = useContext(SocketContext);
    const { createNotification } = useContext(UiContext);

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
    }, [notificationsLimit]);

    useEffect(() => {
        socket?.on('create-appointment-notification', (payload) => {
            setNewNotifications(true);
            createNotification(payload.text, 'success', 4000, 'right');
            setNotifications((prevNotifications) => [payload, ...prevNotifications]);
        });
    }, [socket]); 

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

    const incrementLimit = () => {
        setNotificationsLimit((currentLimit) => currentLimit + 10);
    }

    const deleteNotification = async(id) => {
        try {
            const { data } = await turnos.delete(`/notifications/${ id }/delete`);

            if (data.ok) {
                const notification = document.querySelector('[data-notification]');
                notification.classList.add('menuItemAnimation');

                setTimeout(() => {
                    setNotifications((prevState) => {
                        return prevState.filter(notification => notification._id !== id);
                    })
                }, 300)
            }
        } catch(error) {
            console.log(error);
        }
    }

    return {
        dropdownRef,
        dropdownOpen,
        handleDropdownOpen,
        newNotifications,
        notifications,
        notificationsLoaded,
        incrementLimit,
        deleteNotification
    }
}