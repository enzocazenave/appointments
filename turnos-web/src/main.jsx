import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import './styles/reset.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
);