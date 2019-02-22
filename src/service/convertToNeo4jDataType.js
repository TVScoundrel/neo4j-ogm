const { v1: neo4j } = require('neo4j-driver')

const temporal = ['date', 'datetime', 'time', 'localdatetime', 'localtime']

/**
 * Convert a value to it's neo4j native type
 * @param {Property} config
 * @param {mixed} value
 * @return {mixed}
 */
module.exports = function convertToNeo4jDataType(config, valueToConvert) {
  const type = config.type().toLowerCase()
  let value = valueToConvert

  // Convert temporal to a native date?
  if (temporal.indexOf(type) > -1 && typeof value === 'number') {
    value = new Date(value)
  }

  switch (type) {
    case 'float':
      return parseFloat(value)

    case 'int':
    case 'integer':
      return parseInt(value, 10)

    case 'bool':
    case 'boolean':
      return !!value

    case 'timestamp':
      return value instanceof Date ? value.getTime() : value

    case 'date':
      return value instanceof Date
        ? neo4j.types.Date.fromStandardDate(value)
        : value

    case 'datetime':
      return value instanceof Date
        ? neo4j.types.DateTime.fromStandardDate(value)
        : value

    case 'localdatetime':
      return value instanceof Date
        ? neo4j.types.LocalDateTime.fromStandardDate(value)
        : value

    case 'time':
      return value instanceof Date
        ? neo4j.types.Time.fromStandardDate(value)
        : value

    case 'localtime':
      return value instanceof Date
        ? neo4j.types.LocalTime.fromStandardDate(value)
        : value

    default:
      return value
  }
}
