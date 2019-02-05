module.exports = class Property {
  constructor(name, schema) {
    this._name = name
    this._setSchema(schema)
    this._setPrimary(schema)
    this._setIndex(schema)
    this._setUnique(schema)
  }

  name() {
    return this._name
  }

  type() {
    return this._schema.type
  }

  primary() {
    return this._primary
  }

  unique() {
    return this._unique
  }

  indexed() {
    return this._index
  }

  _setSchema(schema) {
    this._schema = schema
    if (typeof schema === 'string') {
      this._schema = { type: schema }
    }
  }

  _setPrimary() {
    this._primary = 'primary' in this._schema ? this._schema.primary : false
  }

  _setIndex() {
    this._index = 'index' in this._schema ? this._schema.index : false
  }

  _setUnique() {
    this._unique = 'unique' in this._schema ? this._schema.unique : false
  }
}
