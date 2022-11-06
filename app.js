const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')


//Load config
dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

//Body parser
// middle for our form data in our routes/stories.js
app.use(express.urlencoded({ extended: false}))
app.use(express.json())


//Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Passport Config
require('./config/passport')(passport)

//Handlebars
//!add the word .engine after exphbs
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
     extname: '.hbs'
    })
    )
app.set('view engine', '.hbs');

//Session
app.use(
    session({
        secret:'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
        
    })
)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )
    