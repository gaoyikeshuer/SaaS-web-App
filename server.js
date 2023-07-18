//connect to config.env
require('dotenv').config({path: './config.env'})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const errorHandler = require('./middleware/error')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.PORT || 4242

//conect to database
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((db)=>console.log('db is connected'))
.catch((err)=>console.log(err))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/openai', require('./routes/open'))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})