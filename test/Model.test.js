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

describe('::Model', () => {
  const name = 'TestModel'
  const schema = {
    labels: [],
    properties: [],
    relationshipDefinitions: []
  }

  describe(':constructor', () => {
    it('should instantiate', () => {
      const model = new Model(name, schema)
      expect(model).to.be.an.instanceOf(Model)
    })
  })
})
