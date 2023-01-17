const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.post('/register',
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('surname', 'El apellido es obligatorio.').not().isEmpty(),
        check('email', 'El correo electrónico es obligatorio.').isEmail(),
        check('dni', 'El DNI (Documento nacional de identidad) es obligatorio.').isNumeric(),
        check('password', 'La contraseña debe tener 6 o más caractéres').isLength({ min: 6 }),
        fieldValidator
    ],
    registerUser
);

router.post('/login',
    [
        check('email', 'El correo electrónico es obligatorio.').isEmail(),
        check('password', 'La contraseña debe tener 6 o más obligatorio.').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser
);

module.exports = router;