/* eslint-env mocha */
const { expect } = require('chai')
const { Provider } = require('nconf/lib/nconf/provider')

const { srcRequire } = require('../utils')

const config = srcRequire('config/config')

describe('config/config.js', () => {
  it('should return an instance of Provider', () => {
    expect(config).to.be.an.instanceOf(Provider)
  })
  it('should instantiate variables from config.json file', () => {
    expect(config.get('testVar')).to.eq('hello world')
  })
})
