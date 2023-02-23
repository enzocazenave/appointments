import { setHours, setMinutes } from 'date-fns';
import styles from '../../styles/appointments/components/DialogEvent.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { calculateMinTime, isWeekend } from '../../helpers';
import { useEffect, useRef, useState } from 'react';
import { useAppointments } from '../../hooks';
import { Loader } from '../../auth/components';
import { addDays } from 'date-fns/esm';

registerLocale('es',es);

export const DialogEvent = ({ isModalOpen, setIsModalOpen, calendar }) => {

    const { createAppointment, isCreatingAppointment, getAllAppointmentsById, appointments } = useAppointments();
    const [appointmentCreated, setAppointmentCreated] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef();
    const [excludeTimes, setExcludeTimes] = useState([]);
    const currentTime = new Date();
    const [formValues, setFormValues] = useState({
        comment: '',
        appointment_date: '',
        appointment_hour: ''
    }); 
    //calendar?.min_time?.minute
    const minTimeDatePicker = calculateMinTime(currentTime, formValues, calendar?.min_time,  calendar?.max_time);

    useEffect(() => {
        if (isModalOpen) {
            if (formValues.appointment_date instanceof Date) {
                const appointmentsFilter = appointments.map((appointment) => {
                    const { start } = appointment;
                    const selectedDate = `${formValues.appointment_date.getMonth()}/${formValues.appointment_date.getDate()}/${formValues.appointment_date.getFullYear()}`;
                    const appointmentDate = `${start.getMonth()}/${start.getDate()}/${start.getFullYear()}`;

                    if (selectedDate === appointmentDate) return start;
                });

                setExcludeTimes(appointmentsFilter);
                return;
            }

            const appointmentsFilter = appointments.map((appointment) => {
                const { start } = appointment;
                const currentDate = new Date();
                const selectedDate = `${currentDate.getMonth()}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
                const appointmentDate = `${start.getMonth()}/${start.getDate()}/${start.getFullYear()}`;

                if (selectedDate === appointmentDate) return start;
            });

            setExcludeTimes(appointmentsFilter);
        }
        
    }, [formValues.appointment_date, isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            modalRef.current?.removeAttribute('open')
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();       
        }
    }, [isModalOpen]);

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });

        if (changing == 'appointment_date' && formValues.appointment_hour instanceof Date) {
            setFormValues({
                ...formValues,
                appointment_hour: ''
            });
        }
    }

    const handleSubmit = () => {
        const { appointment_date, appointment_hour } = formValues;
        
        if (appointment_date instanceof Date && appointment_hour instanceof Date) {
            createAppointment(formValues, calendar).then(data => {
                setAppointmentCreated(data.appointment);

                if (data.appointment) {
                    setTimeout(() => { getAllAppointmentsById(calendar._id) }, 500);
                }

                setError(data.msg);
            })
        };
    }

    const handleClose = () => {
        setFormValues({ comment: '', appointment: '' });
        setExcludeTimes([]);
        setIsModalOpen(false) 
        setError('');
        setAppointmentCreated(false);
    }

    const handleTimeColor = () => {
        return styles.textSuccess;
    }
    
    return (
        <dialog
            ref={ modalRef }
            className={ styles.createAppointmentModal }
            onCancel={ handleClose }
            onClose={ handleClose }
        >
            {
                (isCreatingAppointment)
                ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Loader />
                </div>
                : appointmentCreated || error
                    ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                        {(error) ? <h1 style={{ textAlign: 'center' }}>{error}</h1> : <h1 style={{ textAlign: 'center' }}>Turno reservado con éxito! Te esperamos el { `${ appointmentCreated.appointment_date_start.day }/${appointmentCreated.appointment_date_start.month + 1}/${appointmentCreated.appointment_date_start.year}` } a las {`${appointmentCreated.appointment_date_start.hour}:${appointmentCreated.appointment_date_start.minute}`}hs</h1>}
                        <button className={ styles.createAppointmentModalClose } onClick={ () => setIsModalOpen(false) }>Salir</button>
                    </div>
                    : (<>
                        <h1 className={ styles.createAppointmentModalTitle }>Reservá tu turno</h1>
                        <span className={ styles.createAppointmentModalSpan }>{ calendar?.name }</span>
                        <p className={ styles.createAppointmentModalText }>
                            { calendar?.text }
                        </p>
                        <div style={{ marginBottom: '3rem' }}>
                            <label className={ styles.createAppointmentModalLabel }>Selecciona la fecha del turno</label>
                            <DatePicker
                                className={ styles.createAppointmentModalPicker }
                                minDate={ (currentTime.getHours() >= calendar?.max_time?.hour && currentTime.getMinutes() > calendar?.max_time?.minute) ? addDays(currentTime, 1) : currentTime }
                                selected={ formValues.appointment_date } 
                                onChange={ (event) => onDateChanged(event, 'appointment_date') }
                                dateFormat="dd/MM/yyyy"
                                locale='es'
                                fixedHeight
                                filterDate={ (date) => isWeekend(date, calendar.appointments_days) }
                                placeholderText="Haz click aqui"
                                onKeyDown={ (e) => {
                                    e.preventDefault()
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '3rem' }}>
                            <label className={ styles.createAppointmentModalLabel }>Selecciona la hora del turno</label>
                            <DatePicker
                                className={ styles.createAppointmentModalPicker }
                                minTime={ setHours(setMinutes(new Date(), minTimeDatePicker.minute), minTimeDatePicker.hour) }
                                maxTime={ setHours(setMinutes(new Date(), calendar?.max_time?.minute), calendar?.max_time?.hour) }
                                excludeTimes={ excludeTimes }
                                timeIntervals={ calendar?.appointments_frequency }
                                selected={ formValues.appointment_hour } 
                                onChange={ (event) => onDateChanged(event, 'appointment_hour') }
                                dateFormat="hh:mm"
                                timeCaption="Hora"
                                locale='es'
                                showTimeSelect
                                showTimeSelectOnly
                                fixedHeight
                                placeholderText="Haz click aqui"
                                onKeyDown={ (e) => {
                                    e.preventDefault()
                                }}
                                disabled={ !(formValues.appointment_date instanceof Date) }
                                timeClassName={ handleTimeColor }
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '3rem' }}>
                            <label className={ styles.createAppointmentModalLabel }>¿Quieres dejar un comentario?</label>
                            <textarea 
                                type="text" 
                                className={ styles.createAppointmentModalInput }
                                placeholder="Comentarios..."
                                value={ formValues.comment }
                                onChange={ (e) => onDateChanged(e.target.value, 'comment') }
                                name="comment"
                            >
                            </textarea>
                        </div>
                        <div className={ styles.createAppointmentModalButtons }>
                            <button className={ styles.createAppointmentModalConfirm } onClick={ handleSubmit }>Reservar</button>
                            <button className={ styles.createAppointmentModalClose } onClick={ () => setIsModalOpen(false) }>Salir</button>
                        </div>
                    </>)
            }
        </dialog>
    )
}