const { driver } = require('./neo4j-auth')
const Model = require('./Model')

module.exports = class Neo4j {
  constructor() {
    this.driver = driver()
    this.models = new Map()
  }

  model(name, schema) {
    if (schema instanceof Object) {
      const model = new Model(name, schema)
      this.models.set(name, model)
    }
    return this.models.get(name)
  }
}
