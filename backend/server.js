const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

//Connect ot DB
connectDB()

const app = express()
app.use(fileUpload())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Routes
app.use('/api/users', require('./routes/userRoutes'))



//Serv frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}else{
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to HackSoft messaging system' })
    })
}



//Error Handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold))