const { response } = require("express");
const Evento = require("../models/Events");

const getEvents = async ( req, res = response ) => {

    const eventos = await Evento.find()
                          .populate('user','name')      

    res.json({
        ok: true,
        eventos
    })
}

const postEvents = async ( req, res = response ) => {

    const evento = new Evento( req.body )

    evento.user = req.uid

    try {

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const putEvents = async ( req, res = response ) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById( eventoId )

        if( !evento ){
            return res.status( 404 ).json({
                ok: false,
                msg: 'No hay evento con ese ID'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status( 401 ).json({
                ok: false,
                msg: 'No tienes privilegios para editar ese evento'
            })
        }

        const eventoEditado = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, eventoEditado, { new: true })

        res.status( 200 ).json({
            ok: true,
            evento: eventoActualizado
        })

        
    } catch (error) {
        console.log(error)
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarEvents = async ( req, res = response ) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById( eventoId )

        if( !evento ){
            return res.status( 404 ).json({
                ok: false,
                msg: 'No hay evento con ese ID'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status( 401 ).json({
                ok: false,
                msg: 'No tienes privilegios para borrar ese evento'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        res.status( 200 ).json({
            ok: true,
            msg: 'Evento eliminado'
        })

        
    } catch (error) {
        console.log(error)
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }

    res.json({
        ok: true,
        msg: 'borrarEvents',
        id
    })
}

module.exports = {
    getEvents,
    postEvents,
    putEvents,
    borrarEvents
}