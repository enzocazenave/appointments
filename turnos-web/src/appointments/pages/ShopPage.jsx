import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/appointments/pages/ShopPage.module.css';
import { LoadingPage } from './';
import { useShopContext } from '../../hooks';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from '../components';
import { getMessagesES, localizer, isWeekend } from '../../helpers';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import es from 'date-fns/locale/es';

registerLocale('es',es);

export const ShopPage = () => {

    const { shopId, calendarId } = useParams();
    const { shopCalendars, shop, modalRef, getCalendarsByShopId, getShopById, setIsModalOpen } = useShopContext();

    useEffect(() => {
        getShopById(shopId);
    }, [shopId]);

    useEffect(() => {
        getCalendarsByShopId(shopId);
    }, [shopId]);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        appointment: '',
    });

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: isSelected ? '#009669' : '#00CC8F',
            borderRadius: '4px',
            opacity: 0.8,
            color: '#F0F0F0'
        }   

        return {
            style
        }
    }

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
                                events={ [{
                                    start: new Date('2023-01-31T13:00:00.000Z'),
                                    end: new Date('2023-01-31T13:15:00.000Z'),
                                    title: 'Peluqueria'
                                }, {
                                    start: new Date('2023-01-31T13:15:00.000Z'),
                                    end: new Date('2023-01-31T13:30:00.000Z'),
                                    title: 'Peluqueria'
                                },{
                                    start: new Date('2023-01-31T13:30:00.000Z'),
                                    end: new Date('2023-01-31T13:45:00.000Z'),
                                    title: 'Peluqueria'
                                }, {
                                    start: new Date('2023-01-31T13:45:00.000Z'),
                                    end: new Date('2023-01-31T14:00:00.000Z'),
                                    title: 'Peluqueria'
                                }] }
                                scrollToTime={ '15:00' }
                                timeslots={1}
                                step={ 15 }
                                defaultView={ 'month' }
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '56vh' }}
                                messages={ getMessagesES() }
                                eventPropGetter={ eventStyleGetter }
                                components={{
                                    event: CalendarEvent
                                }}
                            />
                        )
                    }
                    <dialog
                        className={ styles.createAppointmentModal }
                        ref={ modalRef }
                        onCancel={ () => setIsModalOpen(false) }
                        onClose={ () => setIsModalOpen(false) }
                    >
                        <h1>Reservá tu turno</h1>
                        <label>Fecha y hora del turno</label>
                        <DatePicker 
                            minDate={ new Date()  }
                            minTime={setHours(setMinutes(new Date(), 0), 8)}
                            maxTime={setHours(setMinutes(new Date(), 45), 19)}
                            //*excludeTimes={[new Date("2023-01-31T11:15:00.000Z")]} ESTO CANCELA LA HORA 8.15 (GMT-3)
                            //*excludeDates={ [new Date("2023-01-31T13:00:00.000Z")]} ESTO CANCELA EL DIA 31-01-2023
                            timeIntervals={15}
                            selected={ formValues.appointment } 
                            onChange={ (event) => onDateChanged(event, 'appointment') }
                            dateFormat="Pp"
                            showTimeSelect        
                            locale='es'
                            timeCaption='Hora'
                            fixedHeight
                            filterDate={ isWeekend }
                            withPortal
                            shouldCloseOnSelect={false}

                        />
                        <button onClick={ () => setIsModalOpen(false) }>Salir</button>
                    </dialog>
                </div>
            )
            : <LoadingPage />
        }
        </>
    )
}