import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/appointments/pages/ShopPage.module.css';
import { LoadingPage } from './';
import { useShopContext } from '../../hooks';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DialogEvent, CalendarTable, CalendarsButton } from '../components';
import 'react-datepicker/dist/react-datepicker.css';

export const ShopPage = () => {

    const { shopId, calendarId } = useParams();
    const { 
        shopCalendars, 
        shop, 
        selectedCalendar,
        getCalendarsByShopId,
        getShopById, 
        getSelectedCalendarById,
        setIsModalOpen, 
        isModalOpen 
    } = useShopContext();

    useEffect(() => {
        getShopById(shopId);
    }, [shopId]);

    useEffect(() => {
        getCalendarsByShopId(shopId);
    }, [shopId]);

    useEffect(() => {
        if (shopCalendars.length === 0) return;
        getSelectedCalendarById(calendarId);
    }, [calendarId, shopCalendars]);

    return (
        <>
        {
            (shop)
            ? ( 
                <div className={ styles.container }>
                    <div className={ styles.info }>
                        <img className={ styles.infoImage } src={ shop.image } />
                         <div className={ styles.infoText }>
                            <h1 className={ styles.infoTextTitle }>{ shop.title }</h1>
                            <span className={ styles.infoTextSpan }>{ shop.estimated_location }</span>
                            <p className={ styles.infoTextParagraph }>{ shop.text }</p>
                            <button 
                                className={ `${styles.addAppointmentButton} ${ (!calendarId) && styles.disabled }` } 
                                onClick={ () => setIsModalOpen(true) }
                                disabled={ !calendarId }
                            >
                                Reservá tu turno
                            </button>
                        </div> 
                    </div>
                    <div className={ styles.calendarsHeader }>
                        {shopCalendars.map(calendar => (
                            <CalendarsButton
                                key={ calendar._id }
                                shopId={ shopId }
                                calendar={ calendar }
                                calendarId={ calendarId }
                            />
                        ))}
                    </div>
                    
                    {(calendarId) && (
                        <CalendarTable />
                    )}
                    
                    <DialogEvent 
                        isModalOpen={isModalOpen} 
                        setIsModalOpen={ setIsModalOpen }
                        calendar={ selectedCalendar }
                     />
                </div>
            )
            : <LoadingPage />
        }
        </>
    )
}