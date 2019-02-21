module.exports = class Node {
  constructor(identity = 0, labels = new Map(), properties = new Map()) {
    this._identity = identity
    this._labels = labels
    this._properties = properties
  }

  setProperties(properties) {
    Object.entries(properties).forEach(([key, value]) => {
      this._properties.set(key, value)
    })
  }

  getProperty(propertyName) {
    return this._properties.get(propertyName)
  }

  identity() {
    return this._identity
  }

  labels() {
    return this._labels
  }

  properties() {
    return this._properties
  }
}
