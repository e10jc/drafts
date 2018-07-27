import gql from 'graphql-tag'
import NextLink from 'next/link'
import {Component} from 'react'
import {Mutation} from 'react-apollo'
import {Box, Container, Flex, Link} from 'rebass'

import {AuthContext} from '../pages/_app'

const LOGOUT = gql`
  mutation {
    logoutUser
  }
`

export default class extends Component<{}> {
  render () {
    return <AuthContext.Consumer>
      {user => <Box bg='red' color='white' p={1}>
        <Container>
          <Flex justifyContent='space-between'>
            <NextLink href='/'><a>Drafts</a></NextLink>
    
            {!user ? <Box>
              <NextLink href='/login'><a>Login</a></NextLink>
              <NextLink href='/signup'><a>Signup</a></NextLink>
            </Box> : <Box>
              <NextLink href='/prompts'><a>Prompts</a></NextLink>

              <Mutation
                mutation={LOGOUT}
                onCompleted={() => {
                  window.location.href = '/'
                }}
              >
                {logoutUser => <Link href='javascript:void(0)' onClick={this.handleLogoutClick(logoutUser)}>Logout</Link>}
              </Mutation>
            </Box>}
          </Flex>
        </Container>
      </Box>}
    </AuthContext.Consumer>
  }

  handleLogoutClick = logoutUser => async e => {
    logoutUser()
  }
}