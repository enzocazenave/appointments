import { setHours, setMinutes } from 'date-fns';
import styles from '../../styles/appointments/components/DialogEvent.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { isWeekend } from '../../helpers';
import { useEffect, useRef, useState } from 'react';

registerLocale('es',es);

export const DialogEvent = ({ isModalOpen, setIsModalOpen, calendar }) => {
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
        // TODO: Create the appointment and make the post call to the backend-api
    }

    return (
        <dialog
            ref={ modalRef }
            className={ styles.createAppointmentModal }
            onCancel={ () => {
                setFormValues({ comment: '', appointment: '' });
                setIsModalOpen(false)
            }}
            onClose={ () => {
                setFormValues({ comment: '', appointment: '' });
                setIsModalOpen(false) 
            }}
        >
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
                    placeholder="Comentarios"
                    value={ formValues.comment }
                    onChange={ (e) => onDateChanged(e.target.value, 'comment') }
                    name="comment"
                >
                </textarea>
            </div>
            <div className={ styles.createAppointmentModalButtons }>
                <button className={ styles.createAppointmentModalConfirm } onClick={ () => handleSubmit }>Reservar</button>
                <button className={ styles.createAppointmentModalClose } onClick={ () => setIsModalOpen(false) }>Salir</button>
            </div>
        </dialog>
    )
}