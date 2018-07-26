const {ApolloServer, gql} = require('apollo-server-express')
const {compare, hash} = require('bcrypt')

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
    createUser(email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
  }

  type Query {
    drafts: [Draft]
  }
`

const resolvers = {
  Mutation: {
    createUser: async (obj, {email, password}) => {
      const hashedPassword = await hash(password, 10)
      const user = await User.query().insert({email, password: hashedPassword})
      return user
    },

    loginUser: async (obj, {email, password}) => {
      const user = await User.query().where({email}).first()
      if (user && await compare(password, user.password)) {
        return user
      }
    },
  },
  Query: {
    drafts: async (obj, args, context, info) => Draft.query().eager('[prompt, user]')
  }
}

module.exports = new ApolloServer({resolvers, typeDefs})
