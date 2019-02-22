const { v1: neo4j } = require('neo4j-driver')

const temporal = ['date', 'datetime', 'time', 'localdatetime', 'localtime']
const point = {
  WGS_84_2D: 4326,
  WGS_84_3D: 4979,
  CARTESIAN_2D: 7203,
  CARTESIAN_3D: 9157
}

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

    // https://neo4j.com/docs/cypher-manual/current/functions/spatial/
    case 'point':
      // 4 possible cases: WGS 84 2D and 3D - Cartesian 2D and 3D
      // Cartesian relies on x, y and z values so if x is not a number WGS 84 is assumed
      if (typeof value.x !== 'number') {
        if (
          typeof value.height !== 'number' &&
          typeof value.longitude === 'number' &&
          typeof value.latitude === 'number'
        ) {
          return new neo4j.types.Point(
            point.WGS_84_2D,
            value.longitude,
            value.latitude
          )
        }

        if (
          typeof value.height === 'number' &&
          typeof value.longitude === 'number' &&
          typeof value.latitude === 'number'
        ) {
          return new neo4j.types.Point(
            point.WGS_84_3D,
            value.longitude,
            value.latitude,
            value.height
          )
        }
      } else {
        if (typeof value.z !== 'number' && typeof value.y === 'number') {
          return new neo4j.types.Point(point.CARTESIAN_2D, value.x, value.y)
        }

        if (typeof value.z === 'number' && typeof value.y === 'number') {
          return new neo4j.types.Point(
            point.CARTESIAN_3D,
            value.x,
            value.y,
            value.z
          )
        }
      }
      return value

    default:
      return value
  }
}
