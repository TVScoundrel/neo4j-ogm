/**
 * name: string
 * schema: Object
 * labels: Array<string>
 * properties: Map<string, Property>
 * relationship definitions: Map<string, RelationshipDefinition>
 *
 * primary key: string
 * unique keys: Array<string>
 * indexed keys: Array<string>
 */

/* eslint-env mocha */

const { expect } = require('chai')

const { srcRequire } = require('./utils')

const Model = srcRequire('Model')
const { DIRECTION_BOTH } = srcRequire('RelationshipType')

describe('::Model', () => {
  const name = 'TestModel'
  const schema = {
    labels: ['test', 'label'],
    properties: {
      uuid: {
        type: 'uuid',
        primary: true
      },
      aString: 'string',
      aNumber: {
        type: 'int',
        index: true
      }
    },
    relationshipTypes: {
      knows: {
        relationship: 'KNOWS',
        direction: DIRECTION_BOTH
      }
    }
  }

  describe(':constructor', () => {
    let model
    beforeEach(() => {
      model = new Model(name, schema)
    })

    it('should instantiate', () => {
      expect(model).to.be.an.instanceOf(Model)
    })

    it('should have the proper values', () => {
      expect(model.name()).to.eq(name)
      expect(model.schema()).to.eq(schema)
      expect(model.labels()).to.deep.eq(schema.labels)
      expect(model.properties().size).to.eq(3)
      expect(model.relationshipTypes().size).to.eq(1)
    })

    it('should have default values', () => {
      model = new Model(name, {})
      expect(model.labels()).to.deep.eq([name])
      expect(model.properties().size).to.eq(0)
      expect(model.relationshipTypes().size).to.eq(0)
    })
  })
})
