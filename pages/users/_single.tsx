import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'
import Helmet from 'react-helmet'
import {Box, Heading, Link} from 'rebass'

interface Props {
  query: {
    handle: string,
  }
}

const GET_USER = gql`
  query user($handle: String!) {
    user(handle: $handle) {
      handle
      id
    }
  }
`

class UserPage extends Component<Props> {
  render () {
    return <Query query={GET_USER} variables={{handle: this.props.query.handle}}>
      {({loading, error, data}) => {
        if (loading || error) return null
        return <Box>
          <Helmet>
            <title>@{data.user.handle}</title>
          </Helmet>

          <Heading>@{data.user.handle}</Heading>
        </Box>
      }}
    </Query>
  }
}

export default UserPage