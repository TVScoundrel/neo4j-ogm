module.exports = class Property {
  constructor(name, schema) {
    this._name = name
    this._setSchema(schema)
    this._setType()
    this._setPrimary()
    this._setIndex()
    this._setUnique()
    this._setDefault()
  }

  name() {
    return this._name
  }

  type() {
    return this._type
  }

  default() {
    return this._default
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

  _setType() {
    this._type = this._schema.type
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

  _setDefault() {
    this._default = 'default' in this._schema ? this._schema.default : undefined
  }

  setDefault(defaultValue) {
    this._default = defaultValue
  }
}
