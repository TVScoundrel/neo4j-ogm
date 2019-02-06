/* eslint-env mocha */

const { expect } = require('chai')

const { srcRequire } = require('./utils')

const RelationshipType = srcRequire('RelationshipType')
const Property = srcRequire('Property')

const { DIRECTION_OUT, DIRECTION_BOTH, toUpperSnake } = RelationshipType

describe('::RelationshipType', () => {
  const name = 'someRelation'
  const schema = {
    relationship: 'KNOWS',
    direction: DIRECTION_BOTH,
    properties: {
      since: 'datetimelocal'
    }
  }

  describe(':constructor', () => {
    it('should instantiate', () => {
      const relType = new RelationshipType(name)
      expect(relType).to.be.an.instanceOf(RelationshipType)
    })

    it('should construct with defaults', () => {
      const relType = new RelationshipType(name)
      expect(relType.name()).to.eq(name)
      expect(relType.relationship()).to.eq(toUpperSnake(name))
      expect(relType.direction()).to.eq(DIRECTION_OUT)
    })

    it('should construct with the correct values when given a schema', () => {
      const relType = new RelationshipType(name, schema)
      expect(relType.name()).to.eq(name)
      expect(relType.relationship()).to.eq(schema.relationship)
      expect(relType.direction()).to.eq(schema.direction)
      expect(relType.properties().size).to.eq(1)
      expect(relType.properties().get('since')).to.be.an.instanceOf(Property)
    })
  })
})
