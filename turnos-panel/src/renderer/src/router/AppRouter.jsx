import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AuthProvider } from '../contexts/AuthContext';
import { PanelRoutes } from '../panel/routes/PanelRoutes';

export const AppRouter = () => {

    const path = useLocation().pathname;
    const status = 'authenticated';

    if (status === 'checking' && path !== '/auth/login') return <h1>Cargando</h1>;

    return (
        <Routes>
            {(status === 'authenticated')
                ? <Route path="/*" element={ 
                    <AuthProvider>
                        <PanelRoutes /> 
                    </AuthProvider>
                } />
                : <Route path="/*" element={ <AuthRoutes /> } />
            }
        </Routes>
    )
}
