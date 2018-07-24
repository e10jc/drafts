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
    uri: 'http://localhost:3000',
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

export default (App) => {
  return class Apollo extends React.Component {
    apolloClient: any

    static displayName = 'withApollo(App)'

    static async getInitialProps (ctx) {
      const {Component, router} = ctx

      let appProps = {}
      if (App.getInitialProps) appProps = await App.getInitialProps(ctx)

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

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState)
    }

    render () {
      return <ApolloProvider client={this.apolloClient}>
        <App {...this.props} apolloClient={this.apolloClient} />
      </ApolloProvider>
    }
  }
}