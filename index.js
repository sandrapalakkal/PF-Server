//Load .env file contents into process.env by default.
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const router = require('./routes/router')
require('./db/connection')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT, () => {
    console.log(`Project Fair started at Port ${PORT}`);
})

pfServer.get('/', (req, res) => {
    res.status(200).send(`<h1 style ='color:red;'>Project Fair Server started,and waiting for client request..!!!</h1`)
})

pfServer.post('/',(req,res)=>{
    res.status(200).send('Post Request')
})