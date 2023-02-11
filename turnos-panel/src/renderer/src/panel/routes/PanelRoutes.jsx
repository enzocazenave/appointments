import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar } from '../components'
import { Calendars, Management, Appointments } from '../pages'
import { container, routesContainer } from '../../styles/panel/routes/PanelRoutes.module.css'


export const PanelRoutes = () => {
    return (
        <div className={ container }>
            <Sidebar />

            <div className={ routesContainer }>
                <Routes>
                    <Route path="/" element={ <Management /> } />
                    <Route path="/calendars" element={ <Calendars /> } />
                    <Route path="/appointments" element={ <Appointments /> } />
                    <Route path="/*" element={ <Navigate to="/" /> } />
                </Routes>
            </div>
        </div>
    )
}
