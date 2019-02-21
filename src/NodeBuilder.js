const uuid = require('uuid')

const Node = require('./Node')
const convertToNeo4jDataType = require('./service/convertToNeo4jDataType')

module.exports = class NodeBuilder {
  constructor(neo, model) {
    this._neo = neo
    this._model = model
  }

  create(properties) {
    const node = new Node()
    const seededProperties = this._getSeededProperties(properties)
    node.setProperties(seededProperties)
    return node
  }

  _getSeededProperties(properties) {
    const propConfig = this._model.properties()
    const seededProps = {}

    if (!(properties instanceof Object)) {
      throw new Error('`properties` must be an object', 422)
    }

    propConfig.forEach((config, propName) => {
      if (config.type() === 'uuid') {
        config.setDefault(uuid.v4)
      }

      if (Object.prototype.hasOwnProperty.call(properties, propName)) {
        seededProps[propName] = properties[propName]
      } else if (typeof config.default() !== 'undefined') {
        seededProps[propName] =
          typeof config.default() === 'function'
            ? config.default()()
            : config.default()
      }

      if (seededProps[propName]) {
        seededProps[propName] = convertToNeo4jDataType(
          config,
          seededProps[propName]
        )
      }
    })

    return seededProps
  }
}
