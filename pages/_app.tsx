import NextApp, {Container as NextContainer} from 'next/app'
import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {Box, Container, Provider as ThemeProvider, Text} from 'rebass'
import styled, {injectGlobal} from 'styled-components'

import Footer from '../components/footer'
import Header from '../components/header'
import WithApollo from '../components/with-apollo'

injectGlobal`
  body, html {
    margin: 0;
  }
`

interface Props {
  apolloClient: any,
  query: object,
}

interface State {
  user: any,
}

export const AuthContext = React.createContext(null)

class App extends NextApp<Props> {
  state: State = {
    user: null,
  }

  static async getInitialProps (ctx) {
    return {
      query: ctx.query,
      user: ctx.req && ctx.req.user,
    }
  }

  constructor (props) {
    super(props)
    this.state = {user: props.user}
  }

  render () {
    const {Component, apolloClient, query} = this.props

    return <NextContainer>
      <ApolloProvider client={apolloClient}>
        <AuthContext.Provider value={this.state.user}>
          <ThemeProvider>
            <Wrapper>
              <Header />
              <Box flex='1'>
                <Container>
                  <Component query={query} />
                </Container>
              </Box>
              <Footer />
            </Wrapper>
          </ThemeProvider>
        </AuthContext.Provider>
      </ApolloProvider>
    </NextContainer>
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export default WithApollo(App)