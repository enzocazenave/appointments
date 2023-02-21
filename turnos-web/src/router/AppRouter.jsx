import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AppointmentsRoutes } from '../appointments/routes/AppointmentsRoutes';
import { useAuthContext } from '../hooks';
import { LoadingPage } from '../appointments/pages';
import { CalendarProvider } from '../context/CalendarContext';
import { SocketProvider } from '../context/SocketContext';

export const AppRouter = () => {

    const { status } = useAuthContext();
    const path = useLocation().pathname;
    
    if (status === 'checking' && path !== '/auth/login' && path !== '/auth/register') return <LoadingPage />;

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={ 
                        <SocketProvider>
                            <CalendarProvider>
                                <AppointmentsRoutes /> 
                            </CalendarProvider>
                        </SocketProvider>
                    } />
                    : <Route path="/*" element={ <AuthRoutes /> } />
            }
        </Routes>  
    );
}