import express from 'express'
import { initApp } from './src/initApp.js'

const app = express()

const port = process.env.port||3001

initApp(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))