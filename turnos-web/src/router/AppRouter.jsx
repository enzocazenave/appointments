import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AppointmentsRoutes } from '../appointments/routes/AppointmentsRoutes';
import { useAuthContext } from '../hooks';
import { LoadingPage } from '../appointments/pages';

export const AppRouter = () => {

    const { status } = useAuthContext();

    if (status === 'checking') return <LoadingPage />;

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={ <AppointmentsRoutes /> } />
                    : <Route path="/*" element={ <AuthRoutes /> } />
            }
        </Routes>  
    );
}