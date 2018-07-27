import gql from 'graphql-tag'
import {Component} from 'react'
import {Mutation} from 'react-apollo'
import {Box, Container, Flex} from 'rebass'

import Link from '../components/link'
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
            <Link href='/'>Drafts</Link>
    
            {!user ? <Box>
              <Link href='/login'>Login</Link>
              <Link href='/signup'>Signup</Link>
            </Box> : <Box>
              <Link href='/prompts'>Prompts</Link>

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