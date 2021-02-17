/*
    Rutas de Usuarios / Auth 
    host + /api/auth
*/ 

const express = require( 'express' )
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../midelwares/validar-jwt')
const { validarCampos } = require('../midelwares/validarCampos')

const router = express.Router()

router.post( 
    '/new',
    [ 
        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(), 
        check( 'email', 'El email es obligatorio' ).isEmail(), 
        check( 'password', 'la contraseña tiene que tener un minimo de 6 caracteres ' ).isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
)

router.post( 
    '/',
    [ 
        check( 'email', 'El email es obligatorio' ).isEmail(), 
        check( 'password', 'la contraseña tiene que tener un minimo de 6 caracteres ' ).isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
)

router.get( '/renew', validarJWT, revalidarToken)

module.exports = router
