import express from 'express'
import bodyParser from 'body-parser'
import { UserRoutes } from './routers/utilisateurRoute';
// const messageRouter = require('./routers/messageRoute')
require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const userRoutes = new UserRoutes()
app.use('/utilisateurs', userRoutes.router)


app.listen(process.env.PORT || 3000)
console.log("seerver started on port " + process.env.PORT || 3000)