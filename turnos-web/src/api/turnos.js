import axios from 'axios';

const turnos = axios.create({
    baseURL: 'http://localhost:3000/'
});

turnos.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('@appointments:token')
    };

    return config;
});

export default turnos;