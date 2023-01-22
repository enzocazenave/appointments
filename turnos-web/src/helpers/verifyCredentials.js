export const verifyCredentials = (credentials) => {
    for (const key of Object.keys(credentials)) {
        if (key === 'password') {
            if (credentials[key].length < 6) {
                return {
                    ok: false,
                    msg: 'La contraseña debe tener 6 o más caractéres'
                };
            }
        }

        if (credentials[key].length === 0) {
            return {
                ok: false,
                msg: 'Los datos solicitados son obligatorios.'
            };
        } 
    }

    return {
        ok: true,
        msg: null
    };
}