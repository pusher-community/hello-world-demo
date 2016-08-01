const data = require('./emoji_data.json')
const data_keys = Object.keys(data)

function to_emoji(i) {
  var d = i % data_keys.length
  return data_keys[d] + (d !== i ? ' ' + to_emoji(i - data_keys.length) : '')
}

module.exports = to_emoji
