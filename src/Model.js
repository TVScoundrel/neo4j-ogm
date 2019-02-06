const Property = require('./Property')
const RelationshipType = require('./RelationshipType')

module.exports = class Model {
  constructor(name, schema) {
    this._name = name
    this._schema = schema
    this._labels = [name]

    this._properties = new Map()
    this._relationshipTypes = new Map()

    this._primary_key = `${name.toLowerCase()}_id`
    this._unique = []
    this._indexed = []

    this._parseSchema(schema)
  }

  name() {
    return this._name
  }

  schema() {
    return this._schema
  }

  labels() {
    return this._labels
  }

  properties() {
    return this._properties
  }

  relationshipTypes() {
    return this._relationshipTypes
  }

  _parseSchema(schema) {
    this._setLabels(schema)
    this._setProperties(schema)
    this._setRelationshipTypes(schema)
  }

  _setLabels(schema) {
    const { labels } = schema
    if (labels && Array.isArray(labels)) {
      this._labels = [...labels]
    }
  }

  _setProperties(schema) {
    const { properties } = schema
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

    if (property.primary()) {
      this._primary_key = key
    }

    if (property.primary() || property.unique()) {
      this._unique.push(key)
    }

    if (property.indexed()) {
      this._indexed.push(key)
    }
  }

  _setRelationshipTypes(schema) {
    const { relationshipTypes } = schema
    if (relationshipTypes && typeof relationshipTypes === 'object') {
      Object.keys(relationshipTypes).forEach(key => {
        const value = relationshipTypes[key]
        this._addRelationshipType(key, value)
      })
    }
  }

  _addRelationshipType(key, schema) {
    const relationshipType = new RelationshipType(key, schema)
    this._relationshipTypes.set(relationshipType)
  }
}
