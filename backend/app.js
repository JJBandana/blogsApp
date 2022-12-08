const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.get('/', (req, res) => res.send('<h1>HELLO WORLD!</h1><a href="/api/blogs">GO TO API</a>') )

app.use(middleware.unknownEndpoint) 
app.use(middleware.errorHandler) 

module.exports = app