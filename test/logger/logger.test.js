/* eslint-env mocha */
const { expect } = require('chai')
const Logger = require('winston/lib/winston/logger')

const { srcRequire } = require('../utils')

const logger = srcRequire('logger/logger')

describe('logger/logger.js', () => {
  it('should return an instance of Logger', () => {
    expect(logger).to.be.an.instanceOf(Logger)
  })
})
