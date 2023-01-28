import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import turnos from '../../api/turnos';
import styles from '../../styles/appointments/pages/ShopPage.module.css';
import { LoadingPage } from './';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '../components';
import { getMessagesES, localizer } from '../../helpers';
import { useShopContext } from '../../hooks';

export const ShopPage = () => {

    const { shopId, calendarId } = useParams();
    const { shopCalendars, shop, getCalendarsByShopId, getShopById } = useShopContext();

    useEffect(() => {
        getShopById(shopId);
    }, [shopId]);

    useEffect(() => {
        getCalendarsByShopId(shopId);
    }, [shopId]);

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
                            <button className={ styles.addAppointmentButton }>
                                Reservá tu turno
                            </button>
                        </div> 
                    </div>
                    <div className={ styles.calendarsHeader }>
                        {shopCalendars.map(calendar => (
                            <Link 
                                to={ `/shop/${ shopId }/${ calendar._id }` }
                                key={ calendar._id } 
                                className={`
                                    ${styles.calendarTitle} 
                                    ${(calendarId === calendar._id) ? styles.isSelected : ''}
                                `}
                            >   
                                <img className={ styles.calendarImage } src={ calendar.image } />
                                <span className={ styles.calendarTitleText }>{ calendar.name }</span>
                            </Link>
                        ))}
                    </div>
                    {
                        (calendarId) && (
                            <Calendar
                                culture="es"
                                localizer={ localizer }
                                events={ [] }
                                defaultView={ 'month' }
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '57.8vh' }}
                                messages={ getMessagesES() }
                                components={{
                                    event: CalendarEvent
                                }}
                            />
                        )
                    }
                </div>
            )
            : <LoadingPage />
        }
        </>
    )
}