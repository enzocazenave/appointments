import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthContext } from '../hooks/useAuthContext';
import { PanelRoutes } from '../panel/routes/PanelRoutes';

export const AppRouter = () => {

    const path = useLocation().pathname;
    const { status } = useAuthContext();

    if (status === 'checking' && path !== '/auth/login') return <h1>Cargando</h1>;

    return (
        <Routes>
            {(status === 'authenticated')
                ? <Route path="/*" element={ <PanelRoutes /> } />
                : <Route path="/*" element={ <AuthRoutes /> } />
            }
        </Routes>
    )
}
