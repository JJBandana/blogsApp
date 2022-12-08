const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')
const config = require('./utils/config')

const server = http.createServer(app)

app.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}`)
})