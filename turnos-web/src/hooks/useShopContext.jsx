import { useState } from "react";
import turnos from "../api/turnos";

export const useShopContext = () => {
    const [shop, setShop] = useState([]);
    const [shopCalendars, setShopCalendars] = useState([]);
    const [isLoading, setLoading] = useState(false);

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

    const getShopById = async(shopId) => {
        setLoading(true);

        try {
            const { data } = await turnos.get(`/shops/${ shopId }`);
            setShop(data.shop);
        } catch(error) {
            console.log(error);
        }

        setLoading(false);
    }
    
    return {
        //* Metodos
        getCalendarsByShopId,
        getShopById,

        //* Propiedades
        shopCalendars,
        shop,
        isLoading
    }
}