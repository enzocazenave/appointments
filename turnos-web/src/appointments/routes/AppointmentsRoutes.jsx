import { Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';
import { HomePage, ShopPage } from '../pages';

export const AppointmentsRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/shop/:shopId" element={ <ShopPage /> } />
                <Route path="/*" element={ <Navigate to="/" /> } />
            </Routes>
        </>
    )
}