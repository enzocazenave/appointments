import axios from 'axios';

const turnos = axios.create({
    baseURL: 'http://127.0.0.1:3000/api'
});

turnos.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('@appointments_panel:token')
    };

    return config;
});

export default turnos;