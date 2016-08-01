const pusher = require('./lib/pusher_client')

pusher.trigger('demo', 'alert', {message: 'Hello world!'})

let users = []
pusher.get({ path: '/channels/presence-demo/users' }, (err, req, res) => {
  const response = JSON.parse(res.body)
  users = response.users
})
