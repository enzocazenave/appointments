import { useState } from "react";
import turnos from "../api/turnos";

export const useShopContext = () => {
    const [shop, setShop] = useState([]);
    const [shopCalendars, setShopCalendars] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCalendar, setSelectedCalendar] = useState({});

    const getCalendarsByShopId = async(id) => {
        setLoading(true);
        
        try {
            const { data } = await turnos.get(`/shops/${id}/calendars`);
            setShopCalendars(data.calendars);
        } catch(error) {
            console.log(error);
        }

        setLoading(false);
    }

    const getShopById = async(id) => {
        setLoading(true);

        try {
            const { data } = await turnos.get(`/shops/${ id }`);
            setShop(data.shop);
        } catch(error) {
            console.log(error);
        }

        setLoading(false);
    }
    
    const getSelectedCalendarById = (id) => (
        setSelectedCalendar(shopCalendars.filter(shopCalendar => (
            shopCalendar._id === id
        ))[0])
    );
    
    return {
        //* Metodos
        getCalendarsByShopId,
        getShopById,
        getSelectedCalendarById,
        setIsModalOpen,

        //* Propiedades
        shopCalendars,
        shop,
        selectedCalendar,
        isLoading,
        isModalOpen
    }
}