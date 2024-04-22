const express = require('express')
const bodyParser = require('body-parser')
const utilisateurRouter = require('./routers/utilisateurRoute')
const messageRouter = require('./routers/messageRoute')
require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



app.use('/utilisateurs', utilisateurRouter)

 
app.listen(process.env.PORT || 3000)
console.log("seerver started on port "+process.env.PORT || 3000 )