const { driver } = require('./neo4j-auth')

module.exports = class Neo4j {
  constructor() {
    this.driver = driver()
    this.models = new Map()
  }
}
