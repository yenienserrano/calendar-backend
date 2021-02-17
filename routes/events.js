/*
    Rutas de Eventos / Events 
    host + /api/events
*/ 

const express = require('express')
const { check } = require('express-validator')
const { getEvents, postEvents, putEvents, borrarEvents } = require('../controllers/events')
const { isDate } = require('../helpers/isDate')
const { validarJWT } = require('../midelwares/validar-jwt')
const { validarCampos } = require('../midelwares/validarCampos')

const router = express.Router()

router.use( validarJWT )

router.get( '/', getEvents )

router.post( 
    '/',
    [
        check( 'title', 'El titulo es obligatorio').not().isEmpty(),
        check( 'start', 'La hora de inicio es obligatorio').custom( isDate ),
        check( 'end', 'La hora de finalizacion es obligatorio').custom( isDate ),
        validarCampos
    ], 
    postEvents 
)

router.put( 
    '/:id',
    [
        check( 'title', 'El titulo es obligatorio').not().isEmpty(),
        check( 'start', 'La hora de inicio es obligatorio').custom( isDate ),
        check( 'end', 'La hora de finalizacion es obligatorio').custom( isDate ),
        validarCampos
    ],  
    putEvents 
)

router.delete( '/:id', borrarEvents )

module.exports = router