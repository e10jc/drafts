const {ApolloServer, AuthenticationError, gql} = require('apollo-server-express')
const {compare} = require('bcrypt')
const {sign} = require('jsonwebtoken')
const slugify = require('slugify')

const Draft = require('./models/draft')
const Prompt = require('./models/prompt')
const User = require('./models/user')

const typeDefs = gql`
  type Draft {
    body: String
    id: Int!
    prompt: Prompt
    slug: String
    user: User
  }

  type Prompt {
    drafts: [Draft]
    id: Int!
    slug: String
    title: String
  }

  type User {
    handle: String
    id: Int!
    email: String
  }

  type Mutation {
    createDraft(promptId: Int!, body: String!): Draft
    createPrompt(title: String!): Prompt
    createUser(email: String!, password: String!): String
    loginUser(email: String!, password: String!): String
    logoutUser: String
  }

  type Query {
    draft(slug: String!): Draft
    drafts: [Draft]
    prompt(slug: String!): Prompt
    prompts: [Prompt]
  }
`

const createToken = user => sign({
  id: user.id,
  handle: user.handle, 
}, process.env.JWT_SECRET)

const setCookie = (token, {res}) => token ? res.cookie('token', token) : res.clearCookie('token')

const resolvers = {
  Mutation: {
    createDraft: async (obj, {body, promptId}, {req}) => {
      if (!req.user) throw new AuthenticationError('must be logged-in')
      return Draft.query().insert({
        body,
        promptId,
        slug: slugify(body), 
        userId: req.user.id
      })
    },

    createPrompt: async (obj, {title}, {req}) => {
      if (!req.user) throw new AuthenticationError('must be logged-in')
      return Prompt.query().insert({
        slug: slugify(title), 
        title, 
        userId: req.user.id
      })
    },

    createUser: async (obj, {email, password}, {res}) => {
      const user = await User.query().insert({email, password: User.createPasswordHash(password)})
      const token = createToken(user)
      setCookie(token, {res})
      return token
    },

    loginUser: async (obj, {email, password}, {res}) => {
      const user = await User.query().where({email}).first()
      if (!user || !await compare(password, user.password)) throw new AuthenticationError('invalid credentials')
      const token = createToken(user)
      setCookie(token, {res})
      return token
    },

    logoutUser: async (obj, args, {res}) => {
      setCookie(null, {res})
    }
  },
  Query: {
    draft: async (obj, {slug}) => Draft.query().findOne({slug}),
    drafts: async (obj, args, context, info) => Draft.query().eager('[prompt, user]'),
    prompt: async (obj, {slug}) => Prompt.query().findOne({slug}).eager('drafts'),
    prompts: async (obj, args, context, info) => Prompt.query(),
  }
}

module.exports = new ApolloServer({
  context: ({req, res}) => ({req, res}),
  resolvers, 
  typeDefs,
})
