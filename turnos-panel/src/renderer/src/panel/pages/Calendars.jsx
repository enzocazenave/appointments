import { useCalendars } from '../../hooks';
import styles from '../../styles/panel/pages/Calendars.module.css';
import { Plus } from '../../svgs';
import { Avatar, HeaderPage } from '../components';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es',es);

export const Calendars = () => {

    const { selectedCalendar, setSelectedcalendar, addAppointmentDay } = useCalendars();

    return (
        <div className={ styles.container }>
            <HeaderPage title="Calendarios" />

            <div className={ styles.menuContainer }>
                <div className={ styles.menuCalendars }>
                    <button style={{ fontWeight: 600 }} className={ styles.calendar }>
                        <Plus />
                        Crear calendario
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Ariel
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Gustavo
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Ariel
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Gustavo
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Ariel
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Gustavo
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Ariel
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Gustavo
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Ariel
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Gustavo
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Ariel
                    </button>
                    <button className={ styles.calendar }>
                        <Avatar width={ 28 } height={ 28 } />
                        Gustavo
                    </button>
                </div>
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
                                />
                            </div>
                            <div className={ styles.inputContainer }>
                                <label>Descripción</label>
                                <textarea 
                                    style={{ height: 100 }}
                                    className={ styles.input }
                                    placeholder="Estas reservando un turno con Ariel, trabaja los martes y jueves de 8.00hs a 18.00hs"
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
                                    onChange={ () => addAppointmentDay(1) }
                                />
                                <span>Lunes</span>
                            </div>
                            <div className={ styles.checkboxContainer}>
                                <input
                                    className={ styles.input }
                                    type="checkbox"
                                    onChange={ () => addAppointmentDay(2) }
                                />
                                <span>Martes</span>
                            </div>
                            <div className={ styles.checkboxContainer}>
                                <input
                                    className={ styles.input }
                                    type="checkbox"
                                    onChange={ () => addAppointmentDay(3) }
                                />
                                <span>Miercoles</span>
                            </div>
                            <div className={ styles.checkboxContainer}>
                                <input
                                    className={ styles.input }
                                    type="checkbox"
                                    onChange={ () => addAppointmentDay(4) }
                                />
                                <span>Jueves</span>
                            </div>
                            <div className={ styles.checkboxContainer}>
                                <input
                                    className={ styles.input }
                                    type="checkbox"
                                    onChange={ () => addAppointmentDay(5) }
                                />
                                <span>Viernes</span>
                            </div>
                            <div className={ styles.checkboxContainer}>
                                <input
                                    className={ styles.input }
                                    type="checkbox"
                                    onChange={ () => addAppointmentDay(6) }
                                />
                                <span>Sábado</span>
                            </div>
                            <div className={ styles.checkboxContainer}>
                                <input
                                    className={ styles.input }
                                    type="checkbox"
                                    onChange={ () => addAppointmentDay(0) }
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
                                />
                            </div>
                            <div className={ styles.inputContainer }>
                                <label>Primer horario de turnos</label>
                                <DatePicker
                                    className={ styles.input }
                                    //timeIntervals={ calendar?.appointments_frequency }
                                    //selected={ formValues.appointment_hour } 
                                    //onChange={ (event) => onDateChanged(event, 'appointment_hour') }
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
                                />
                            </div>
                            <div className={ styles.inputContainer }>
                                <label>Último horario de turnos</label>
                                <DatePicker
                                    className={ styles.input }
                                    //timeIntervals={ calendar?.appointments_frequency }
                                    //selected={ formValues.appointment_hour } 
                                    //onChange={ (event) => onDateChanged(event, 'appointment_hour') }
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
                                />
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    )
}   