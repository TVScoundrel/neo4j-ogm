/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const sinon = require('sinon')
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

  const name = 'TestModel'
  const schema = {}
  describe(':model', () => {
    it('should create, add and return a new model', () => {
      const model = neo.model(name, schema)
      expect(model).to.be.instanceOf(Model)
    })

    it('should return an existing model', () => {
      const model = neo.model(name, schema)
      expect(neo.model(name)).to.eq(model)
    })
  })

  describe(':create', () => {
    it('should call the create method of the model', () => {
      const stub = sinon.stub(Model.prototype, 'create').callsFake(() => 'mock')
      neo.model(name, schema)
      neo.create(name, {})
      expect(stub.calledOnce).to.be.true
      stub.restore()
    })
  })
})
