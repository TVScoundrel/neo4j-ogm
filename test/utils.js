const rewire = require('rewire')

module.exports = {
  srcRequire: mod => require(`../src/${mod}`),
  srcRewire: mod => rewire(`../src/${mod}`)
}
