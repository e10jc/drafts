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
  }

  type Query {
    drafts: [Draft]
  }
`

const createToken = (user, {res}) => {
  const token = sign({id: user.id, email: user.email}, process.env.JWT_SECRET)
  res.cookie('token', token)
  return token
}

const resolvers = {
  Mutation: {
    createUser: async (obj, {email, password}, {res}) => {
      const hashedPassword = await hash(password, 10)
      const user = await User.query().insert({email, password: hashedPassword})
      return createToken(user, {res})
    },

    loginUser: async (obj, {email, password}, {res}) => {
      const user = await User.query().where({email}).first()
      if (user && await compare(password, user.password)) {
        return createToken(user, {res})
      }
    },
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
