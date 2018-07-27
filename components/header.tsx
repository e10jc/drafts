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
      {user => <Box bg='black' color='white'>
        <Container>
          <Flex alignItems='center' justifyContent='space-between'>
            <Link color='white' href='/' p={1}>Drafts</Link>
    
            <Box>
              <Link color='white' href='/prompts' p={1}>Prompts</Link>

              {!user ? <>
                <Link color='white' href='/login' p={1}>Login</Link>
                <Link color='white' href='/signup' p={1}>Signup</Link>
              </> : <>
                <Mutation
                  mutation={LOGOUT}
                  onCompleted={() => {
                    window.location.href = '/'
                  }}
                >
                  {logoutUser => <Link color='white' href='javascript:void(0)' onClick={this.handleLogoutClick(logoutUser)} p={1}>Logout</Link>}
                </Mutation>
              </>}
            </Box>
          </Flex>
        </Container>
      </Box>}
    </AuthContext.Consumer>
  }

  handleLogoutClick = logoutUser => async e => {
    logoutUser()
  }
}