/* eslint-env mocha */
const { expect } = require('chai')
const { Driver } = require('neo4j-driver/lib/v1/driver')

const { srcRequire } = require('./utils')

const Neo = srcRequire('Neo')

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
})
