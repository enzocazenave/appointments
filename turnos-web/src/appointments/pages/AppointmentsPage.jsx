import { useState } from 'react';
import { useEffect } from 'react';
import turnos from '../../api/turnos';
import { formatDate } from '../../helpers';
import { useAuthContext } from '../../hooks';
import styles from '../../styles/appointments/pages/AppointmentsPage.module.css';
import { LoadingPage } from './LoadingPage';
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState({
        current: [],
        notCurrent: [],
        cancelled: []
    });

    const [appointmentsToShow, setAppointmentsToShow] = useState(appointments.current);
    const [appointmentSelected, setAppointmentSelected] = useState({});
    const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);
    const [appointmentsType, setAppointmentsType] = useState('current'); // current - notCurrent - cancelled
    const { user } = useAuthContext();
    
    console.log(appointmentSelected)
    useEffect(() => {
        turnos.get(`/users/appointments/${ user._id }`)
            .then(({ data }) => setAppointments({ 
                current: data.currentAppointments,
                notCurrent: data.notCurrentAppointments,
                cancelled: data.cancelledAppointments
            }))
            .finally(() => {
                setAppointmentsLoaded(true);
            });
    }, []);

    useEffect(() => {
        setAppointmentsToShow(appointments.current);
    }, [appointments]);
    
    return (
        <>
            {(appointmentsLoaded)
            ? (
                <div className={ styles.container }>
                    <div className={ styles.appointments }>
                        <h1 className={ styles.title }>Turnos</h1>
                        <div className={ styles.appointmentsTypes }>
                            <button 
                                className={ `${styles.appointmentsType} ${(appointmentsType === 'current') && styles.selectedCurrent}`}
                                onClick={ () => {
                                    setAppointmentsType('current');
                                    setAppointmentsToShow(appointments.current);
                                    setAppointmentSelected({});
                                }}    
                            >
                                Vigentes
                            </button>
                            <button 
                                className={ `${styles.appointmentsType} ${(appointmentsType === 'notCurrent') && styles.selectedNotCurrent}`}
                                onClick={ () => {
                                    setAppointmentsType('notCurrent');
                                    setAppointmentsToShow(appointments.notCurrent);
                                    setAppointmentSelected({});
                                }}
                            >
                                No vigentes
                            </button>
                            <button 
                                className={ `${styles.appointmentsType} ${(appointmentsType === 'cancelled') && styles.selectedCancelled}`}
                                onClick={ () => {
                                    setAppointmentsType('cancelled');
                                    setAppointmentsToShow(appointments.cancelled);
                                    setAppointmentSelected({});
                                }}
                            >
                                Cancelados
                            </button>
                        </div>
                        { (appointmentsToShow.length > 0)
                        ? appointmentsToShow.map(appointment => (
                            <div
                                key={ appointment._id }
                                onClick={ () => setAppointmentSelected(appointment) }
                                className={ `${styles.appointment} ${ appointmentSelected._id === appointment._id && styles.selected }` }
                            >
                                <img className={ styles.appointmentImage } src={ appointment.shop.image } />
                                <span>{ appointment.shop.title }</span>
                                <span>{ formatDate(appointment.appointment_date_start)[0] }</span>
                            </div>
                        ))
                        : <h2 style={{
                            opacity: .35,
                            fontWeight: 400,
                            textAlign: 'center',
                            marginTop: 30
                        }}>
                            No se encontraron turnos
                        </h2>
                        }
                    </div>
                    <div className={ styles.appointmentsInfo }>
                        {
                            (appointmentSelected?.shop?.title)
                            ? <div className={ styles.containerInfo }>
                                <img className={ styles.infoImage } src={ appointmentSelected.shop.image } />
                                <h2 className={ styles.infoTitle }>{ appointmentSelected.shop.title }</h2>
                                <h3 className={ styles.infoName }>{ appointmentSelected.calendar_name }</h3>
                                <span className={ styles.dateSpan }>{ days[new Date(`${appointmentSelected.appointment_date_start.month+1}/${appointmentSelected.appointment_date_start.day}/${appointmentSelected.appointment_date_start.year}`).getDay()] }</span>
                                <span className={ styles.dateSpan }>{ formatDate(appointmentSelected.appointment_date_start)[0] }</span>
                                <div>
                                    <span className={ styles.dateSpan }>{ formatDate(appointmentSelected.appointment_date_start)[1] }</span>&nbsp;
                                    -
                                    &nbsp;<span className={ styles.dateSpan }>{ formatDate(appointmentSelected.appointment_date_end)[1] }</span>
                                </div>
                                <span className={ styles.span }>
                                    <div 
                                        className={ ` 
                                            ${styles.circleColor} 
                                            ${ (appointmentsType === 'current') && styles.vigente } 
                                            ${ (appointmentsType === 'notCurrent') && styles.noVigente }
                                            ${ (appointmentsType === 'cancelled') && styles.cancelado }
                                        `}
                                    >
                                    </div>
                                    { appointmentsType === 'current' && 'Vigente' }
                                    { appointmentsType === 'notCurrent' && 'No vigente' }
                                    { appointmentsType === 'cancelled' && 'Cancelado' }
                                </span>
                                <span>{ appointmentSelected.cancelledMessage }</span>
                            </div>
                            : <h2 style={{
                                opacity: .35,
                                fontWeight: 400
                            }}>
                                Selecciona un turno para ver más información
                            </h2>
                        }
                    </div>
                </div>
            )
            : <LoadingPage />
            }
        </>
    );
}