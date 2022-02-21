const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')    
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('Connected to mongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB', error.message)
})


app.use(cors())
app.use(express.json())

app.use('/api', blogRouter)

module.exports = app