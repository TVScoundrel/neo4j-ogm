/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')

const { srcRequire } = require('./utils')

const Neo = srcRequire('Neo')
const Node = srcRequire('Node')
const NodeBuilder = srcRequire('NodeBuilder')
const { DIRECTION_BOTH } = srcRequire('RelationshipType')

const modelName = 'Person'
const modelSchema = {
  labels: ['Person'],
  properties: {
    uuid: {
      type: 'uuid',
      primary: true
    },
    firstname: 'string',
    lastname: 'string',
    dateOfBirth: 'date',
    numberOfPets: {
      type: 'int',
      default: 0
    }
  },
  relationshipTypes: {
    knows: {
      relationship: 'KNOWS',
      direction: DIRECTION_BOTH
    }
  }
}

describe('::NodeBuilder', () => {
  describe(':constructor', () => {
    it('should instantiate', () => {
      const nodeBuilder = new NodeBuilder()
      expect(nodeBuilder).to.be.instanceOf(NodeBuilder)
    })
  })

  describe(':create', () => {
    let neo
    let model
    let subject
    beforeEach(() => {
      neo = new Neo()
      model = neo.model(modelName, modelSchema)
      subject = new NodeBuilder(neo, model)
    })

    it('should return a Node', () => {
      expect(subject.create({})).to.be.instanceOf(Node)
    })

    it('should throw if no properties are given', () => {
      expect(() => subject.create()).to.throw('`properties` must be an object')
    })

    it('should populate the node with passed-in values', () => {
      const node = subject.create({ firstname: 'Tom', lastname: 'Van Schoor' })
      expect(node.getProperty('firstname')).to.eq('Tom')
      expect(node.getProperty('lastname')).to.eq('Van Schoor')
    })
  })
})
