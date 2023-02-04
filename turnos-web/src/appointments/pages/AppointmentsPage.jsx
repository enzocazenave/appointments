import { useState } from 'react';
import { useEffect } from 'react';
import turnos from '../../api/turnos';
import { formatDate } from '../../helpers';
import { useAuthContext } from '../../hooks';
import styles from '../../styles/appointments/pages/AppointmentsPage.module.css';
import { LoadingPage } from './LoadingPage';
const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

export const AppointmentsPage = () => {

    const [appointments, setAppointments] = useState([]);
    const [appointmentSelected, setAppointmentSelected] = useState({});
    const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        turnos.get(`/users/appointments/${ user._id }`)
            .then(({ data }) => setAppointments(data.appointments))
            .finally(() => {
                setAppointmentsLoaded(true);
               
            });
    }, []);
    if (appointmentSelected?.shop?.image) {
        console.log(new Date(`${2}/${6}/${2023}`))
    }
    return (
        <>
            {(appointmentsLoaded)
            ? (
                <div className={ styles.container }>
                    <div className={ styles.appointments }>
                        <h1 className={ styles.title }>Tus turnos</h1>
                        { appointments.map(appointment => (
                            <div
                                key={ appointment._id }
                                onClick={ () => setAppointmentSelected(appointment) }
                                className={ `${styles.appointment} ${ appointmentSelected._id === appointment._id && styles.selected }` }
                            >
                                <img className={ styles.appointmentImage } src={ appointment.shop.image } />
                                <span>{ appointment.shop.title }</span>
                                <span>{ formatDate(appointment.appointment_date_start)[0] }</span>
                            </div>
                        )) }
                    </div>

                    <div className={ styles.appointmentsInfo }>
                        {
                            (appointmentSelected?.shop?.image)
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
                            </div>
                            : <h2 style={{
                                opacity: .35,
                                fontWeight: 400
                            }}>Selecciona un turno para ver más información</h2>
                        }
                    </div>
                </div>
            )
            : <LoadingPage />
            }
        </>
    );
}