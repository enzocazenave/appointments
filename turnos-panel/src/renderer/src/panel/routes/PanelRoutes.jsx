import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar } from '../components'
import { Home } from '../pages'
import { container, routesContainer } from '../../styles/panel/routes/PanelRoutes.module.css'


export const PanelRoutes = () => {
    return (
        <div className={ container }>
            <Sidebar />

            <div className={ routesContainer }>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/*" element={ <Navigate to="/" /> } />
                </Routes>
            </div>
        </div>
    )
}
