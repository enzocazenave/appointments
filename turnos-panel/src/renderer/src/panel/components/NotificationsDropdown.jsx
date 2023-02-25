import { useNotification } from '../../hooks';
import styles from '../../styles/panel/components/NotificationsDropdown.module.css';
import { Bell, BellRinging, Trash } from '../../svgs/';

export const NotificationsDropdown = () => {

    const { 
        notifications, 
        newNotifications, 
        dropdownRef,
        dropdownOpen,
        handleDropdownOpen,
        incrementLimit,
        deleteNotification
    } = useNotification();

    return (
        <div 
            className={ styles.dropdown }
            onClick={ handleDropdownOpen }
        >
            <a href="#">
                { newNotifications ? <BellRinging /> : <Bell /> }
            </a>

            <ul 
                className={ styles.menu }
                style={{
                    opacity: dropdownOpen ? 1 : 0,
                    visibility: dropdownOpen ? 'visible' : 'hidden',
                    transform: dropdownOpen ? 'translateY(0px)' : 'translateY(-10px)'
                }}
                ref={ dropdownRef }
            >
                { (notifications?.length === 0) 
                    ? (
                        <li className={ styles.menuItem }>
                            <span>No hay notificaciones</span>
                        </li> 
                    )
                    : notifications?.map(notification => (
                        <li 
                            className={ styles.menuItem } 
                            data-notification={ notification._id } 
                            key={ notification._id }
                        >
                            <span>{ notification.text }</span>
                            <button 
                                className={ styles.menuItemDelete }
                                onClick={ () =>  deleteNotification(notification._id)}
                            >
                                <Trash />
                            </button>
                        </li>
                    ))
                }
                
                <li className={ styles.menuItemShowMore } onClick={ incrementLimit }>
                    <span>Ver más</span>
                </li>
            </ul>
        </div>
    )
}