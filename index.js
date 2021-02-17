const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

// Crear servidor

const app = express()

dbConnection()

// Directorio publico
app.use(cors())

app.use( express.static( 'public' ))
app.use( express.json() )

app.use( '/api/auth', require('./routes/auth'))
app.use( '/api/events', require('./routes/events'))

// Escuchar Servidor

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
})