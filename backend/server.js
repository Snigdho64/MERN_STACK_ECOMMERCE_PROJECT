const app = require('./app')
const cloudinary = require('cloudinary')
const connectDB = require('./config/database')

// LOAD ENVIRONMENT VARIABLES FROM config.env
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

// UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
    console.error(err.message)
    console.log('Exiting the server')
})

// CONNECT TO DATABASE
connectDB()
    .then((connection) => {
        // CLOUDINARY IMAGE UPLOAD
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        // ONLY THEN CONNECT TO SERVER
        app.listen(process.env.PORT, () => {
            console.log(
                '*-'.repeat(10) +
                    ' '.repeat(5) +
                    'Backend Server Connected on Port : ' +
                    process.env.PORT +
                    ' '.repeat(5) +
                    '*-'.repeat(10)
            )
        })
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })

// UNHANDLED PROMISE REJECTION ERROR
process.on('unhandledRejection', (err) => {
    console.log(err.message)
    //   console.log(err.stack);
    process.exit(1)
})
