const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const Blog = require('./models/blog')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
