/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const { expect } = require('chai')

const { srcRequire, srcRewire } = require('./utils')

const config = srcRequire('config/config')
const mod = srcRewire('neo4j-auth')

const configMock = (mocked = false) => {
  if (mocked) {
    return {
      get: () => null
    }
  }
  return config
}

describe('neo4j-auth.js', () => {
  describe('when config exists', () => {
    describe(':auth()', () => {
      it('should not be null', () => {
        mod.__set__('config', configMock())
        expect(mod.auth()).not.to.be.null
      })
    })
    describe(':driver()', () => {
      it('should not be null', () => {
        mod.__set__('config', configMock())
        expect(mod.driver()).not.to.be.null
      })
    })
  })

  describe('when config does not exists', () => {
    describe(':auth()', () => {
      it('should be null', () => {
        mod.__set__('config', configMock(true))
        expect(mod.auth()).to.be.null
      })
    })
    describe(':driver()', () => {
      it('should be null', () => {
        mod.__set__('config', configMock(true))
        expect(mod.driver()).to.be.null
      })
    })
  })
})
