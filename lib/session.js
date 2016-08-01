var namor = require('namor')

var Redis = require('ioredis')
var redis = new Redis()

const session = require('express-session')
const Store = require('connect-redis')(session)

const middleware = session({
  store: new Store({client: redis}),
  secret: 'Jake <3 saxaphones'
})


module.exports = app => {

  app.use(middleware)

  app.get('/reset', (req, res) => {
    req.session.destroy()
    res.send('done')
  })

  app.use((req, res, next) => {

    if (!req.session.user_id)
      req.session.user_id = namor.generate({numLen:1})

    next()

    // alternate - incrementing emoji names
    // if (req.session.user_id)
    //   next()
    // else
    //   redis.incr('user_id_counter')
    //     .then(i => {
    //       req.session.user_id = emoji(i)
    //       next()
    //     })

  })
}
