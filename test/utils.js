/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const rewire = require('rewire')

module.exports = {
  srcRequire: mod => require(`../src/${mod}`),
  srcRewire: mod => rewire(`../src/${mod}`)
}
