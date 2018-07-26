import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import * as React from 'react'
import {ApolloProvider, getDataFromTree} from 'react-apollo'

if (!process.browser) {
  global.fetch = fetch
}

const create = (initialState = {}) => new ApolloClient({
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache().restore(initialState)
})

let client = null

const initApollo = (initialState = {}) => {
  if (!process.browser) return create(initialState)
  if (!client) client = create(initialState)
  return client
}

const AuthContext = React.createContext(null)

interface State {
  user: object,
}

export default App => class Apollo extends React.Component<{}, State> {
  apolloClient: any
  authContext: any

  state = {
    user: null,
  }

  static displayName = `withApollo(${App.displayName})`

  static async getInitialProps (ctx) {
    const {Component, req, router} = ctx

    let appProps = {}
    if (App.getInitialProps) appProps = await App.getInitialProps(ctx)

    const apollo = initApollo()
    if (!process.browser) {
      try {
        await getDataFromTree(
          <ApolloProvider client={apollo}>
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          </ApolloProvider>
        )
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error)
      }

      Head.rewind()
    }

    const apolloState = apollo.cache.extract()

    return {
      ...appProps,
      apolloState,
      user: req && req.user,
    }
  }

  constructor (props) {
    super(props)
    this.apolloClient = initApollo(props.apolloState)
    this.state = {user: props.user}
  }

  render () {
    return <ApolloProvider client={this.apolloClient}>
      <AuthContext.Provider value={this.state.user}>
        <App {...this.props} />
      </AuthContext.Provider>
    </ApolloProvider>
  }
}