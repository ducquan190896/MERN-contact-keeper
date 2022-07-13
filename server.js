const express = require('express')
const { appendFile } = require('fs')
const mongoose = require('mongoose')
const path = require('path')
const connectDB = require('./config/db')
const cors = require('cors')



require('dotenv').config({path: './config/config.env'})
const app = express()
connectDB()
app.use(cors())
app.use(express.json({extended: false}))



app.use('/api/users', require('./controller/user'))
app.use('/api/contacts', require('./controller/contact'))


app.get('/', async (req, res) => {
    res.status(200).json({message: 'success'})
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))