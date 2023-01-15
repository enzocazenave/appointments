import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AppointmentsRoutes } from '../appointments/routes/AppointmentsRoutes';

export const AppRouter = () => {
    const status = 'not-authenticated';

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