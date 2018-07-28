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

  app.get('/drafts/new', (req, res) => handle(req, res))
  app.get('/drafts/:slug', (req, res) => nextApp.render(req, res, '/drafts/_single', {slug: req.params.slug}))
  app.get('/prompts/new', (req, res) => handle(req, res))
  app.get('/prompts/:slug', (req, res) => nextApp.render(req, res, '/prompts/_single', {slug: req.params.slug}))
  app.get('/@:handle/:slug', (req, res) => nextApp.render(req, res, '/drafts/_single', {handle: req.params.handle, slug: req.params.slug}))
  app.get('/@:handle', (req, res) => nextApp.render(req, res, '/users/_single', {handle: req.params.handle}))

  app.get('*', (req, res) => handle(req, res))

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
