const { createLogger, transports } = require('winston')

const config = require('../config/config')

const logger = createLogger({
  level: config.get('log_level'),
  transports: [new transports.Console()]
})

module.exports = logger
