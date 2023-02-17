import styles from '../../styles/panel/components/Sidebar.module.css';
import { Calendar, CalendarEvent, Cog, Manage, OtherCalendar } from '../../svgs';
import { SidebarItem } from './SidebarItem';
import { useAuthContext } from '../../hooks';
import { useMemo } from 'react';

export const Sidebar = () => {

    const { user } = useAuthContext();
    const date = useMemo(() => {
        const splittedDate = user.created_at.split('-');
        const formattedDate = {
            year: splittedDate[0],
            month: splittedDate[1],
            day: splittedDate[2].split('T')[0]
        }

        return `${formattedDate.day}/${formattedDate.month}/${formattedDate.year}`
    }, [user.created_at]);

    return (
        <nav className={ styles.container }>
            <div>
                <div className={ styles.brand }>
                    <Calendar fill={ '#282A36' } width={ 25 } height={ 25 } />
                    <span className={ styles.brandText }>Turnate</span>
                </div>

                <SidebarItem
                    to="/"
                    icon={ <Manage /> }
                    text="Gestión"
                />
                <SidebarItem
                    to="/calendars"
                    icon={ <OtherCalendar /> }
                    text="Calendarios"
                />
                <SidebarItem
                    to="/appointments"
                    icon={ <CalendarEvent /> }
                    text="Turnos"
                />
                <SidebarItem
                    to="/settings"
                    icon={ <Cog /> }
                    text="Configuración"
                />
            </div>

            <div className={ styles.bottom }>
                <h2 className={ styles.title }>{ user.title }</h2>
                <span className={ styles.text }>Te adheriste a nosotros el { date }</span>
            </div>
        </nav>
    )
}