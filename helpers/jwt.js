const jwt = require("jsonwebtoken");

const generarJWT = ( id, name ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { id, name } 

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {
            if( err ){
                console.log( err )
                reject( 'Comuniquese con el administrador' )
            }

            resolve( token )
        } )
    })
}


module.exports = {
    generarJWT
}
