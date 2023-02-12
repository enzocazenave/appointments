import { useEffect } from "react";

export const Avatar = ({ id, type, width = '25px', height = '25px', circle = true }) => {

    const queryResult = 'https://avatars.githubusercontent.com/u/102680110?v=4';

    useEffect(() => {
        if (type === 'shop') {
            return;
        }

        // type === 'calendar'
    }, []);

    return (
        <img 
            style={{
                width,
                height,
                borderRadius: circle ? '50%' : '.5rem'
            }} 
            src={ queryResult } 
        />
    )
}