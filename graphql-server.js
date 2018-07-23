const {ApolloServer, gql} = require('apollo-server-express')

const typeDefs = gql`
  type User {
    email: String
  }

  type Query {
    users: [User]
  }
`

const resolvers = {
  Query: {
    users: () => [{
      id: 1,
      email: 'fuck@fuck.com',
    }]
  }
}

module.exports = new ApolloServer({resolvers, typeDefs})
