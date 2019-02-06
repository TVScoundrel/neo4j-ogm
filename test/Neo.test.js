/* eslint-env mocha */
const { expect } = require('chai')
const { Driver } = require('neo4j-driver/lib/v1/driver')

const { srcRequire } = require('./utils')

const Neo = srcRequire('Neo')
const Model = srcRequire('Model')

describe('::Neo', () => {
  let neo = null
  beforeEach(() => {
    neo = new Neo()
  })

  describe(':constructor', () => {
    it('should instantiate', () => {
      expect(neo).to.be.an.instanceOf(Neo)
      expect(neo.models).to.be.an.instanceOf(Map)
      expect(neo.models.size).to.eq(0)
      expect(neo.driver).to.be.an.instanceOf(Driver)
    })
  })

  describe(':model', () => {
    const name = 'TestModel'
    const schema = {}
    it('should create, add and return a new model', () => {
      const model = neo.model(name, schema)
      expect(model).to.be.instanceOf(Model)
    })

    it('should return an existing model', () => {
      const model = neo.model(name, schema)
      expect(neo.model(name)).to.eq(model)
    })
  })
})
