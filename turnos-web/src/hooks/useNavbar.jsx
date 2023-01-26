import { useEffect, useMemo, useRef, useState } from "react"
import turnos from "../api/turnos";
import { useAuthContext } from "./useAuthContext";

export const useNavbar = ({ searchQuery }) => {

    const [active, setActive] = useState(false);
    const userDropdownRef = useRef();
    const searchDropdownRef = useRef();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [searchedShops, setSearchedShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const { user: { created_at, name, surname }, logout } = useAuthContext();

    const date = useMemo(() => {
        const splittedDate = created_at.split('-');
        const formattedDate = {
            year: splittedDate[0],
            month: splittedDate[1],
            day: splittedDate[2].split('T')[0]
        }

        return `${formattedDate.day}/${formattedDate.month}/${formattedDate.year}`
    }, []);

    const handleScroll = () => {
        setActive(scrollY > (innerHeight / 2));
    }

    useEffect(() => {
        const handleDropdown = (e) => {
            if (!userDropdownRef.current.contains(e.target)) setIsUserDropdownOpen(false);
            if (!searchDropdownRef.current.contains(e.target)) setIsSearchDropdownOpen(false);
        }
        
        document.addEventListener('mousedown', handleDropdown);
        
        return () => {
            document.removeEventListener('mousedown', handleDropdown);
        }
    }, []);

    useEffect(() => {   
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        searchShops();
    }, []);

    useEffect(() => {
        filterShops(searchQuery)
    }, [searchQuery]);

    const searchShops = async() => {        
        try {
            const { data } = await turnos.get('/shops/search');
            setSearchedShops([...data.shops]);
        } catch(error) {
            console.log(error);
        }
    }
    
    const filterShops = (searchQuery) => {
        if (searchQuery === '') {
            setFilteredShops([]);
            return;
        };

        const newFilteredShops = searchedShops.filter(shop => {
            return shop.title.toLowerCase().startsWith(searchQuery.toLowerCase());
        });
        setFilteredShops(newFilteredShops);
    }

    return {
        active,
        userDropdownRef,
        searchDropdownRef,
        isSearchDropdownOpen,
        isUserDropdownOpen,
        setIsSearchDropdownOpen,
        setIsUserDropdownOpen,
        filteredShops,
        date,
        name,
        surname,
        logout
    }
}