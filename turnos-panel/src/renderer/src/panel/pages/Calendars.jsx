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

const checkIfSomeChange = (selectedCalendar, inputValues, appointmentsDays) => {
    if (selectedCalendar.name !== inputValues.name) return false;
    if (selectedCalendar.text !== inputValues.description) return false;
    if (selectedCalendar.appointments_frequency !== parseInt(inputValues.appointments_frequency)) return false;
    if (selectedCalendar.appointments_days !== appointmentsDays) return false;
    if (selectedCalendar.min_time.hour !== inputValues.first_time.getHours()) return false;
    if (selectedCalendar.min_time.minute !== inputValues.first_time.getMinutes()) return false;
    if (selectedCalendar.max_time.hour !== inputValues.second_time.getHours()) return false;
    if (selectedCalendar.max_time.minute !== inputValues.second_time.getMinutes()) return false;

    return true;
}

export const Calendars = () => {

    const { 
        calendars, 
        selectedCalendar, 
        setSelectedCalendar, 
        appointmentsDays, 
        changeAppointmentDay, 
        setAppointmentsDays 
    } = useCalendars();

    const [creatingCalendar, setCreatingCalendar] = useState(false);

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

    const saveChanges = () => {
        console.log('hola')
    }

    const cancelCreate = () => {
        setCreatingCalendar(false);
        setInputValues({
            name: '',
            description: '',
            appointments_frequency: '',
            first_time: '',
            second_time: ''
        });
        setAppointmentsDays([]);
    }

    const startCreatingCalendar = () => {
        setSelectedCalendar({});
        setCreatingCalendar(true);
        setInputValues({
            name: '',
            description: '',
            appointments_frequency: '',
            first_time: '',
            second_time: ''
        });
        setAppointmentsDays([]);
    }

    return (
        <div className={ styles.container }>
            <HeaderPage title="Calendarios" />

            <div className={ styles.menuContainer }>
                <div className={ styles.menuCalendars }>
                    <button 
                        style={{ fontWeight: 600 }} 
                        className={`
                            ${styles.calendar}
                            ${ (creatingCalendar) && styles.calendarSelected }
                        `}
                        onClick={ startCreatingCalendar }
                    >
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
                            onClick={ () => {
                                if (creatingCalendar) setCreatingCalendar(false);
                                setSelectedCalendar(calendar) 
                            }}
                        >
                            <Avatar src={ calendar.image } width={ 28 } height={ 28 } />
                            { calendar.name }
                        </button>
                    ))}
                </div>
                
                {(selectedCalendar?._id || creatingCalendar) && (
                    <div className={ styles.menuCalendarsSelected }>
                        <div className={ styles.menuFirstLine }>
                            <Avatar src={ selectedCalendar.image } width={ 200 } height={ 200 } />
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

                        <button 
                            className={`
                                ${styles.saveEditButton}
                                ${checkIfSomeChange(selectedCalendar, inputValues, appointmentsDays) && styles.saveEditButtonDisabled}
                            `}
                            disabled={ checkIfSomeChange(selectedCalendar, inputValues, appointmentsDays) }
                            onClick={ saveChanges }
                        >
                            { creatingCalendar ? 'Crear calendario' : 'Guardar cambios' }
                        </button>
                        {(creatingCalendar) && (
                            <button 
                                className={`
                                    ${styles.cancelEditButton}
                                    ${checkIfSomeChange(selectedCalendar, inputValues, appointmentsDays) && styles.saveEditButtonDisabled}
                                `}
                                disabled={ checkIfSomeChange(selectedCalendar, inputValues, appointmentsDays) }
                                onClick={ cancelCreate }
                            >
                                Cancelar
                            </button>
                        )}
                        
                    </div>
                )}
            </div>
        </div>
    )
}