/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

const { expect } = require('chai')

const { srcRequire } = require('./utils')

const Property = srcRequire('Property')

describe('::Property', () => {
  describe(':constructor', () => {
    it('should instantiate', () => {
      const property = new Property('test', 'string')
      expect(property).to.be.an.instanceOf(Property)
      expect(property.name()).to.eq('test')
      expect(property.type()).to.eq('string')
    })

    it('sets the type', () => {
      const prop = new Property('test', { type: 'int', primary: true })
      expect(prop.type()).to.eq('int')
    })

    it('can be a primary', () => {
      const prop = new Property('test', { type: 'string', primary: true })
      expect(prop.primary()).to.be.true
    })

    it('can be a unique key', () => {
      const prop = new Property('test', { type: 'string', unique: true })
      expect(prop.unique()).to.be.true
    })

    it('can be an index', () => {
      const prop = new Property('test', { type: 'string', index: true })
      expect(prop.indexed()).to.be.true
    })
  })
})
