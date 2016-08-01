const pusher = require('./lib/pusher_client')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))
require('./lib/session')(app)


app.use(bodyParser.urlencoded({ extended: false }))

app.post('/pusher/auth', (req, res) => {

  const socket_id     = req.body.socket_id
  const channel_name  = req.body.channel_name

  const data = {
    user_id: req.session.user_id,
    user_info: {}
  }

  res.send(
    pusher.authenticate(socket_id, channel_name, data)
  )
})


app.listen(5000)


// live reload index.html
require('chokidar')
  .watch('./public/index.html')
  .on('change', _ => pusher.trigger('demo', 'reload', {}))
