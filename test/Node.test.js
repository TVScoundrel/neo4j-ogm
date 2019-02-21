/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')

const { srcRequire } = require('./utils')

const Node = srcRequire('Node')

describe('::Node', () => {
  describe(':constructor', () => {
    it('should construct with default values', () => {
      const node = new Node()
      expect(node).to.be.instanceOf(Node)
      expect(node.identity()).to.eq(0)
      expect(node.labels().size).to.eq(0)
      expect(node.properties().size).to.eq(0)
    })
  })
})
