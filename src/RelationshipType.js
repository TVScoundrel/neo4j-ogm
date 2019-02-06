const Property = require('./Property')

const DIRECTION_IN = 'DIRECTION_IN'
const DIRECTION_OUT = 'DIRECTION_OUT'
const DIRECTION_BOTH = 'DIRECTION_BOTH'

const toUpperSnake = word => {
  return word.replace(/([A-Z])/g, b => `_${b}`).toUpperCase()
}

class RelationshipType {
  constructor(name, schema = {}) {
    this._name = name
    this._schema = schema
    this._properties = new Map()

    this._setRelationship()
    this._setDirection()
    this._setProperties()
  }

  name() {
    return this._name
  }

  relationship() {
    return this._relationship
  }

  direction() {
    return this._direction
  }

  properties() {
    return this._properties
  }

  _setRelationship() {
    this._relationship =
      'relationship' in this._schema
        ? this._schema.relationship
        : toUpperSnake(this._name)
  }

  _setDirection() {
    this._direction =
      'direction' in this._schema && this._validDirection()
        ? this._schema.direction
        : DIRECTION_OUT
  }

  _validDirection() {
    return (
      [DIRECTION_IN, DIRECTION_OUT, DIRECTION_BOTH].indexOf(
        this._schema.direction
      ) !== -1
    )
  }

  _setProperties() {
    const { properties } = this._schema
    if (properties && typeof properties === 'object') {
      Object.keys(properties).forEach(key => {
        const value = properties[key]
        this._addProperty(key, value)
      })
    }
  }

  _addProperty(key, schema) {
    const property = new Property(key, schema)
    this._properties.set(key, property)
  }
}

RelationshipType.DIRECTION_IN = DIRECTION_IN
RelationshipType.DIRECTION_OUT = DIRECTION_OUT
RelationshipType.DIRECTION_BOTH = DIRECTION_BOTH
RelationshipType.toUpperSnake = toUpperSnake

module.exports = RelationshipType
