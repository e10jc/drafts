const {ApolloServer, gql} = require('apollo-server-express')
const {compare, hash} = require('bcrypt')
const {sign} = require('jsonwebtoken')

const Draft = require('./models/draft')
const User = require('./models/user')

const typeDefs = gql`
  type Draft {
    id: Int!
    prompt: Prompt
    user: User
  }

  type Prompt {
    id: Int!
    title: String
  }

  type User {
    id: Int!
    email: String
  }

  type Mutation {
    createUser(email: String!, password: String!): String
    loginUser(email: String!, password: String!): String
    logoutUser: String
  }

  type Query {
    drafts: [Draft]
  }
`

const createToken = user => sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
const setCookie = (token, {res}) => token ? res.cookie('token', token) : res.clearCookie('token')

const resolvers = {
  Mutation: {
    createUser: async (obj, {email, password}, {res}) => {
      const hashedPassword = await hash(password, 10)
      const user = await User.query().insert({email, password: hashedPassword})
      const token = createToken(user)
      setCookie(token, {res})
      return token
    },

    loginUser: async (obj, {email, password}, {res}) => {
      const user = await User.query().where({email}).first()
      if (user && await compare(password, user.password)) {
        const token = createToken(user)
        setCookie(token, {res})
        return token
      }
    },

    logoutUser: async (obj, args, {res}) => {
      setCookie(null, {res})
    }
  },
  Query: {
    drafts: async (obj, args, context, info) => Draft.query().eager('[prompt, user]')
  }
}

module.exports = new ApolloServer({
  context: ({res}) => ({res}),
  resolvers, 
  typeDefs,
})
