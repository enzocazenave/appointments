import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { UiProvider } from './contexts/UiContext';
import { FixedNotificationsContainer } from './panel/pages';
import { AppRouter } from './router/AppRouter'
import './styles/global.css';

createRoot(document.getElementById('root')).render(
    <UiProvider>
        <AuthProvider>
            <BrowserRouter>
                <FixedNotificationsContainer />
                <AppRouter />
            </BrowserRouter>
        </AuthProvider>
    </UiProvider>
)