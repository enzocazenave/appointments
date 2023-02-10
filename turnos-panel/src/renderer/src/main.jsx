import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import './styles/global.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
)