import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar, Navbar } from '../components'
import { Calendars, Management, Appointments, Settings } from '../pages'
import { container, routesContainer } from '../../styles/panel/routes/PanelRoutes.module.css'


export const PanelRoutes = () => {
    return (
        <div className={ container }>
            <Sidebar />

            <div className={ routesContainer }>
                <Navbar />
                <Routes>
                    <Route path="/" element={ <Management /> } />
                    <Route path="/calendars" element={ <Calendars /> } />
                    <Route path="/appointments" element={ <Appointments /> } />
                    <Route path="/settings" element={ <Settings /> } />
                    <Route path="/*" element={ <Navigate to="/" /> } />
                </Routes>
            </div>
        </div>
    )
}