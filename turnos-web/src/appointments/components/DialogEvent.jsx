import { setHours, setMinutes } from 'date-fns';
import styles from '../../styles/appointments/components/DialogEvent.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { isWeekend } from '../../helpers';
import { useEffect, useRef, useState } from 'react';
import { useAppointments } from '../../hooks';
import { Loader } from '../../auth/components';

registerLocale('es',es);

export const DialogEvent = ({ isModalOpen, setIsModalOpen, calendar }) => {

    const { createAppointment, isCreatingAppointment } = useAppointments();
    const [appointmentCreated, setAppointmentCreated] = useState(false);
    const [error, setError] = useState('');

    const modalRef = useRef();

    const [formValues, setFormValues] = useState({
        comment: '',
        appointment: ''
    });

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    useEffect(() => {
        if (isModalOpen) {
            
            modalRef.current?.removeAttribute('open')
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();       
        }
    }, [isModalOpen]);

    const handleSubmit = () => {
        const { comment, appointment } = formValues;
        
        if (appointment instanceof Date) {
            createAppointment(formValues, calendar).then(data => {
                setAppointmentCreated(true);
                
                setError(data.msg);
            })
        };
    }

    const handleClose = () => {
        setFormValues({ comment: '', appointment: '' });
        setIsModalOpen(false) 
        setError('');
        setAppointmentCreated(false);
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
                : appointmentCreated
                    ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                        {(error) ? <h1>{error}</h1> : <h1>Turno reservado con éxito! Te esperamos el 24/02/2023 a las 15:00hs</h1>}
                        <button className={ styles.createAppointmentModalClose } onClick={ () => setIsModalOpen(false) }>Salir</button>
                    </div>
                    : (<>
                        <h1 className={ styles.createAppointmentModalTitle }>Reservá tu turno</h1>
                        <span className={ styles.createAppointmentModalSpan }>{ calendar?.name }</span>
                        <p className={ styles.createAppointmentModalText }>
                            { calendar?.text }
                        </p>
                        <div style={{ marginBottom: '3rem' }}>
                            <label className={ styles.createAppointmentModalLabel }>Selecciona la fecha y hora del turno</label>
                            <DatePicker
                                className={ styles.createAppointmentModalPicker }
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
                                placeholderText="Haz click aqui"
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