import styles from '../../styles/panel/components/Sidebar.module.css';
import { Calendar, CalendarEvent, Cog, Manage, OtherCalendar } from '../../svgs';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {
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
                <h2 className={ styles.title }>Sizó Gerard</h2>
                <span className={ styles.text }>Te adheriste a nosotros el 24/02/2021</span>
            </div>
        </nav>
    )
}