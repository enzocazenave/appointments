import { useEffect, useState } from 'react';
import styles from '../../styles/panel/pages/Management.module.css';
import { CalendarEvent } from '../../svgs';
import { CommerceStatus, HeaderPage, Loader } from '../components';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
const data = [
    { month: 1, appointments: 15  },
    { month: 2, appointments: 50  },
    { month: 3, appointments: 63  },
    { month: 4, appointments: 43  },
    { month: 5, appointments: 119 },
    { month: 6, appointments: 243 },
    { month: 7, appointments: 320 },
    { month: 8, appointments: 287 },
    { month: 9, appointments: 301 },
    { month: 10, appointments: 120 },
    { month: 11, appointments: 145 },
    { month: 12, appointments: 200 }
];

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const CustomTooltip = ({ active, payload, label }) => {

    const payloadData = payload[0]?.payload;

    return (
        <div className={ styles.tooltip }>
            <p className={ styles.tooltipLabel }>{ monthNames[payloadData?.month - 1] }</p>
            <p className={ styles.tooltipDescription }>Turnos: { payloadData?.appointments }</p>
        </div>
    )
}

export const Management = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, []);

    return (
        <div 
            className={ styles.container }
            style={
                (loading) 
                ? {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
                : {}
            }
        >
            {
                (loading)
                ? (
                    <Loader />
                )
                : (<>
                    <HeaderPage title="Gestión" showButton />

                    <div className={ styles.firstLine }>
                        <CommerceStatus payed />
                                    
                        <div className={ styles.status }>
                            <CalendarEvent  />
                                    
                            <div className={ styles.rightZone }>
                                <h3 className={ styles.statusTitle }>Total de turnos</h3>
                                    
                                <div className={ styles.statusContainer }>
                                    <span className={ styles.statusText }>1238 turnos</span>
                                </div>
                            </div>
                        </div>
                                    
                        <div className={ styles.status }>
                            <CalendarEvent  />
                                    
                            <div className={ styles.rightZone }>
                                <h3 className={ styles.statusTitle }>Turnos de febrero</h3>
                                    
                                <div className={ styles.statusContainer }>
                                    <span className={ styles.statusText }>138 turnos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ styles.secondLine }>
                        <ResponsiveContainer width={ '50%' } height={ 240 } >
                            <LineChart data={data}>
                                <Line type="monotone" dataKey="appointments" stroke="#00cc8f" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip content={ <CustomTooltip /> } />
                            </LineChart>
                        </ResponsiveContainer>

                        <div className={ styles.calendars }>
                            <div className={ styles.calendarTitle }>
                                <h3>Turnos vigentes por calendario</h3>
                            </div>

                            <div className={ styles.calendarsScrollable }>
                                <div className={ styles.calendar }>
                                    <div className={ styles.calendarLeft }>
                                        <img className={ styles.calendarImg } src="https://avatars.githubusercontent.com/u/102680110?v=4" />
                                        <span>Ariel</span>
                                    </div>
                                    <span>120</span>
                                </div>
                                <div className={ styles.calendar }>
                                    <div className={ styles.calendarLeft }>
                                        <img className={ styles.calendarImg } src="https://avatars.githubusercontent.com/u/102680110?v=4" />
                                        <span>Ariel</span>
                                    </div>
                                    <span>53</span>
                                </div>
                                <div className={ styles.calendar }>
                                    <div className={ styles.calendarLeft }>
                                        <img className={ styles.calendarImg } src="https://avatars.githubusercontent.com/u/102680110?v=4" />
                                        <span>Ariel</span>
                                    </div>
                                    <span>12</span>
                                </div>
                                <div className={ styles.calendar }>
                                    <div className={ styles.calendarLeft }>
                                        <img className={ styles.calendarImg } src="https://avatars.githubusercontent.com/u/102680110?v=4" />
                                        <span>Ariel</span>
                                    </div>
                                    <span>34</span>
                                </div>
                                <div className={ styles.calendar }>
                                    <div className={ styles.calendarLeft }>
                                        <img className={ styles.calendarImg } src="https://avatars.githubusercontent.com/u/102680110?v=4" />
                                        <span>Ariel</span>
                                    </div>
                                    <span>65</span>
                                </div>
                                <div className={ styles.calendar }>
                                    <div className={ styles.calendarLeft }>
                                        <img className={ styles.calendarImg } src="https://avatars.githubusercontent.com/u/102680110?v=4" />
                                        <span>Ariel</span>
                                    </div>
                                    <span>32</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </>)
            }
        </div>
    )
}
