import { useCalendars } from '../../hooks';
import styles from '../../styles/panel/pages/Calendars.module.css';
import { Plus } from '../../svgs';
import { Avatar, HeaderPage } from '../components';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { setHours, setMinutes } from 'date-fns';

registerLocale('es',es);

export const Calendars = () => {

    const { calendars, selectedCalendar, setSelectedCalendar, appointmentsDays, changeAppointmentDay, setAppointmentsDays } = useCalendars();
    const [inputValues, setInputValues] = useState({
        name: '',
        description: '',
        appointments_frequency: '',
        first_time: '',
        second_time: ''
    });

    useEffect(() => {
        if (!selectedCalendar._id) return;
        const { name, text, appointments_frequency, min_time, max_time, appointments_days } = selectedCalendar;

        setInputValues({
            name, 
            description: text, 
            appointments_frequency,
            first_time: setHours(setMinutes(new Date(), min_time.minute), min_time.hour),
            second_time: setHours(setMinutes(new Date(), max_time.minute), max_time.hour)
        });
        setAppointmentsDays(appointments_days)
    }, [selectedCalendar])

    const onChangeInput = (key, value) => {
        setInputValues({ ...inputValues, [key]: value });
    }

    return (
        <div className={ styles.container }>
            <HeaderPage title="Calendarios" />

            <div className={ styles.menuContainer }>
                <div className={ styles.menuCalendars }>
                    <button style={{ fontWeight: 600 }} className={ styles.calendar }>
                        <Plus />
                        Crear calendario
                    </button>

                    {calendars?.map(calendar => (
                        <button 
                            className={`
                                ${styles.calendar}
                                ${ (calendar._id === selectedCalendar?._id) && styles.calendarSelected }
                            `}
                            key={ calendar._id }
                            onClick={ () => setSelectedCalendar(calendar) }
                        >
                            <Avatar src={ calendar.image } width={ 28 } height={ 28 } />
                            { calendar.name }
                        </button>
                    ))}
                </div>
                
                {(selectedCalendar?._id) && (
                    <div className={ styles.menuCalendarsSelected }>
                        <div className={ styles.menuFirstLine }>
                            <Avatar width={ 200 } height={ 200 } />
                            <div className={ styles.menuFirstLineRight }>
                                <div className={ styles.inputContainer }>
                                    <label>Nombre</label>
                                    <input
                                        className={ styles.input }
                                        type="text"
                                        placeholder="Ariel"
                                        value={ inputValues.name }
                                        onChange={ (e) => onChangeInput('name', e.target.value) }
                                    />
                                </div>
                                <div className={ styles.inputContainer }>
                                    <label>Descripción</label>
                                    <textarea 
                                        style={{ height: 100 }}
                                        className={ styles.input }
                                        placeholder="Estas reservando un turno con Ariel, trabaja los martes y jueves de 8.00hs a 18.00hs"
                                        value={ inputValues.description }
                                        onChange={ (e) => onChangeInput('description', e.target.value) }
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className={ styles.menuSecondLine }>
                            <div className={ styles.inputContainer }>
                                <label>Días de atención</label>
                                <div className={ styles.checkboxContainer}>
                                    <input
                                        className={ styles.input }
                                        type="checkbox"
                                        onChange={ () => changeAppointmentDay(1) }
                                        checked={ appointmentsDays.includes(1) }
                                    />
                                    <span>Lunes</span>
                                </div>
                                <div className={ styles.checkboxContainer}>
                                    <input
                                        className={ styles.input }
                                        type="checkbox"
                                        onChange={ () => changeAppointmentDay(2) }
                                        checked={ appointmentsDays.includes(2) }
                                    />
                                    <span>Martes</span>
                                </div>
                                <div className={ styles.checkboxContainer}>
                                    <input
                                        className={ styles.input }
                                        type="checkbox"
                                        onChange={ () => changeAppointmentDay(3) }
                                        checked={ appointmentsDays.includes(3) }
                                    />
                                    <span>Miercoles</span>
                                </div>
                                <div className={ styles.checkboxContainer}>
                                    <input
                                        className={ styles.input }
                                        type="checkbox"
                                        onChange={ () => changeAppointmentDay(4) }
                                        checked={ appointmentsDays.includes(4) }
                                    />
                                    <span>Jueves</span>
                                </div>
                                <div className={ styles.checkboxContainer}>
                                    <input
                                        className={ styles.input }
                                        type="checkbox"
                                        onChange={ () => changeAppointmentDay(5) }
                                        checked={ appointmentsDays.includes(5) }
                                    />
                                    <span>Viernes</span>
                                </div>
                                <div className={ styles.checkboxContainer}>
                                    <input
                                        className={ styles.input }
                                        type="checkbox"
                                        onChange={ () => changeAppointmentDay(6) }
                                        checked={ appointmentsDays.includes(6) }
                                    />
                                    <span>Sábado</span>
                                </div>
                                <div className={ styles.checkboxContainer}>
                                    <input
                                        className={ styles.input }
                                        type="checkbox"
                                        onChange={ () => changeAppointmentDay(0) }
                                        checked={ appointmentsDays.includes(0) }
                                    />
                                    <span>Domingo</span>
                                </div>
                            </div>

                            <div className={ styles.menuFirstLineRight }>
                                <div className={ styles.inputContainer }>
                                    <label>Frecuencia de turnos en minutos</label>
                                    <input
                                        className={ styles.input }
                                        type="text"
                                        placeholder="30"
                                        value={ inputValues.appointments_frequency }
                                        onChange={ (e) => onChangeInput('appointments_frequency', e.target.value) }
                                    />
                                </div>
                                <div className={ styles.inputContainer }>
                                    <label>Primer horario de turnos</label>
                                    <DatePicker
                                        className={ styles.input }
                                        timeIntervals={ 5 }
                                        dateFormat="HH:mm"
                                        timeCaption="Hora"
                                        locale='es'
                                        showTimeSelect
                                        showTimeSelectOnly
                                        fixedHeight
                                        placeholderText="Haz click aqui"
                                        onKeyDown={ (e) => {
                                            e.preventDefault()
                                        }}
                                        selected={ inputValues.first_time }
                                        onChange={ (e) => onChangeInput('first_time', e) }
                                    />
                                </div>
                                <div className={ styles.inputContainer }>
                                    <label>Último horario de turnos</label>
                                    <DatePicker
                                        className={ styles.input }
                                        timeIntervals={ 5 }                                        
                                        dateFormat="HH:mm"
                                        timeCaption="Hora"
                                        locale='es'
                                        showTimeSelect
                                        showTimeSelectOnly
                                        fixedHeight
                                        placeholderText="Haz click aqui"
                                        onKeyDown={ (e) => {
                                            e.preventDefault()
                                        }}
                                        selected={ inputValues.second_time }
                                        onChange={ (e) => onChangeInput('second_time', e) }
                                    />
                                </div>
                            </div>
                        </div>   

                        <button className={ styles.saveEditButton }>Guardar</button>
                    </div>
                )}
            </div>
        </div>
    )
}