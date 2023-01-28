import { Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';
import { AppointmentsPage, HomePage, ProfilePage, ShopPage } from '../pages';

export const AppointmentsRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/shop/:shopId" element={ <ShopPage /> } />
                <Route path="/shop/:shopId/:calendarId" element={ <ShopPage /> } />
                <Route path="/profile" element={ <ProfilePage /> } />
                <Route path="/appointments" element={ <AppointmentsPage /> } />
                <Route path="/*" element={ <Navigate to="/" /> } />
            </Routes>
        </>
    )
}