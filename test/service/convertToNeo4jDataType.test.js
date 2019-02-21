/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const { v1: neo4j } = require('neo4j-driver')

const { srcRequire } = require('../utils')

const convertToNeo4jDataType = srcRequire('service/convertToNeo4jDataType')
const Property = srcRequire('Property')

describe('convertToNeo4jDataType.js', () => {
  it('should convert a float', () => {
    const float = convertToNeo4jDataType(
      new Property('float', { type: 'float' }),
      '4.88'
    )
    expect(float).to.eq(parseFloat(float))
  })

  it('should convert an int', () => {
    const int = convertToNeo4jDataType(
      new Property('int', { type: 'int' }),
      '4'
    )
    expect(int).to.eq(parseInt(int, 10))
  })

  it('should convert an integer', () => {
    const integer = convertToNeo4jDataType(
      new Property('integer', { type: 'integer' }),
      '4'
    )
    expect(integer).to.eq(parseInt(integer, 10))
  })

  it('should convert a bool', () => {
    const bool = convertToNeo4jDataType(
      new Property('bool', { type: 'bool' }),
      'true'
    )
    expect(bool).to.be.true
  })

  it('should convert a boolean', () => {
    const boolean = convertToNeo4jDataType(
      new Property('boolean', { type: 'boolean' }),
      'true'
    )
    expect(boolean).to.be.true
  })

  it('should convert a timestamp', () => {
    const date = new Date()
    const timestamp = convertToNeo4jDataType(
      new Property('timestamp', { type: 'timestamp' }),
      date
    )
    expect(timestamp).to.eq(date.getTime())
  })

  it('should not convert a timestamp when invalid', () => {
    const timestamp = convertToNeo4jDataType(
      new Property('timestamp', { type: 'timestamp' }),
      'not a timestamp'
    )
    expect(timestamp).to.eq('not a timestamp')
  })

  it('should convert a date', () => {
    const date = convertToNeo4jDataType(
      new Property('date', { type: 'date' }),
      new Date()
    )
    expect(date).to.be.instanceOf(neo4j.types.Date)
  })

  it('should not convert a date when invalid', () => {
    const date = convertToNeo4jDataType(
      new Property('date', { type: 'date' }),
      'not a date'
    )
    expect(date).to.eq('not a date')
  })

  it('should convert a date given as a number', () => {
    const date = convertToNeo4jDataType(
      new Property('date', { type: 'date' }),
      new Date().getTime()
    )
    expect(date).to.be.instanceOf(neo4j.types.Date)
  })

  it('should convert a datetime', () => {
    const datetime = convertToNeo4jDataType(
      new Property('datetime', { type: 'datetime' }),
      new Date()
    )
    expect(datetime).to.be.instanceOf(neo4j.types.DateTime)
  })

  it('should not convert a datetime when invalid', () => {
    const datetime = convertToNeo4jDataType(
      new Property('datetime', { type: 'datetime' }),
      'not a datetime'
    )
    expect(datetime).to.eq('not a datetime')
  })

  it('should convert a localdatetime', () => {
    const localdatetime = convertToNeo4jDataType(
      new Property('localdatetime', { type: 'localdatetime' }),
      new Date()
    )
    expect(localdatetime).to.be.instanceOf(neo4j.types.LocalDateTime)
  })

  it('should not convert a localdatetime when invalid', () => {
    const localdatetime = convertToNeo4jDataType(
      new Property('localdatetime', { type: 'localdatetime' }),
      'not a localdatetime'
    )
    expect(localdatetime).to.eq('not a localdatetime')
  })

  it('should convert a time', () => {
    const time = convertToNeo4jDataType(
      new Property('time', { type: 'time' }),
      new Date()
    )
    expect(time).to.be.instanceOf(neo4j.types.Time)
  })

  it('should not convert a time when invalid', () => {
    const time = convertToNeo4jDataType(
      new Property('time', { type: 'time' }),
      'not a time'
    )
    expect(time).to.eq('not a time')
  })

  it('should convert a localtime', () => {
    const localtime = convertToNeo4jDataType(
      new Property('localtime', { type: 'localtime' }),
      new Date()
    )
    expect(localtime).to.be.instanceOf(neo4j.types.LocalTime)
  })

  it('should not convert a localtime when invalid', () => {
    const localtime = convertToNeo4jDataType(
      new Property('localtime', { type: 'localtime' }),
      'not a localtime'
    )
    expect(localtime).to.eq('not a localtime')
  })

  it('should not convert a type that is not defined', () => {
    const localtime = convertToNeo4jDataType(
      new Property('default', { type: 'default' }),
      'something'
    )
    expect(localtime).to.eq('something')
  })
})
