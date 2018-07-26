const cookieParser = require('cookie-parser')
const express = require('express')
const jwt = require('express-jwt')
const next = require('next')

const graphqlServer = require('./graphql-server')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(cookieParser())

  app.use(jwt({
    credentialsRequired: false, 
    getToken: req => req.cookies.token,
    secret: process.env.JWT_SECRET,
  }))

  graphqlServer.applyMiddleware({app})

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
