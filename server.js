const express = require('express')
const next = require('next')

const graphqlServer = require('./graphql-server')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  graphqlServer.applyMiddleware({app})

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})