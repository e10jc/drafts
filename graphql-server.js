const {ApolloServer, gql} = require('apollo-server-express')

const Draft = require('./models/draft')

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

  type Query {
    drafts: [Draft]
  }
`

const resolvers = {
  Query: {
    drafts: async (obj, args, context, info) => Draft.query().eager('[prompt, user]')
  }
}

module.exports = new ApolloServer({resolvers, typeDefs})
