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

const LINK_PROPS = {
  color: 'white',
  p: 1,
}

export default class extends Component<{}> {
  render () {
    return <AuthContext.Consumer>
      {user => <Box bg='black' color='white'>
        <Container>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex>
              <Link href='/' {...LINK_PROPS}>Drafts</Link>
            </Flex>
    
            <Flex>
              {!user ? <>
                <Link href='/login' {...LINK_PROPS}>Login</Link>
                <Link href='/signup' {...LINK_PROPS}>Signup</Link>
              </> : <>
                <Mutation
                  mutation={LOGOUT}
                  onCompleted={() => {
                    window.location.href = '/'
                  }}
                >
                  {logoutUser => <Link href='javascript:void(0)' onClick={this.handleLogoutClick(logoutUser)} {...LINK_PROPS}>Logout</Link>}
                </Mutation>
              </>}
            </Flex>
          </Flex>
        </Container>
      </Box>}
    </AuthContext.Consumer>
  }

  handleLogoutClick = logoutUser => async e => {
    logoutUser()
  }
}