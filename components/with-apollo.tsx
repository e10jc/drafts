import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import * as React from 'react'
import {getDataFromTree} from 'react-apollo'

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

export default App => class Apollo extends React.Component<{}> {
  apolloClient: any
  authContext: any

  static displayName = `withApollo(${App.displayName})`

  static async getInitialProps (ctx) {
    const {Component, router} = ctx

    let appProps = {}
    if (App.getInitialProps) appProps = await App.getInitialProps(ctx.ctx)

    const apollo = initApollo()
    if (!process.browser) {
      try {
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />
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
    }
  }

  constructor (props) {
    super(props)
    this.apolloClient = initApollo(props.apolloState)
  }

  render () {
    return <App
      {...this.props}
      apolloClient={this.apolloClient}
    />
  }
}