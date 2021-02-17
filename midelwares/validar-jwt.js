const jwt = require("jsonwebtoken");
const { response, request } = require("express");


const validarJWT = ( req = request, res = response, next) => {

    const token = req.header('x-token')

    if( !token ){
        res.status( 401 ).json({
            ok: false,
            msg: 'No hay token'
        })
    }

    try {

        const { id, name } = jwt.verify( token, process.env.SECRET_JWT_SEED )
        
        req.uid = id
        req.name = name

    } catch (error) {
        console.log(error)
        res.status( 401 ).json({
            ok: false,
            msg: 'No hay token'
        })
    }

    next()

}

module.exports = {
    validarJWT
}