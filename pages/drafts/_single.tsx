import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'
import Helmet from 'react-helmet'
import {Box, Text} from 'rebass'

interface Props {
  query: {
    slug: string,
  }
}

const GET_DRAFT = gql`
  query draft($slug: String!) {
    draft(slug: $slug) {
      body
      id
      slug
    }
  }
`

class DraftPage extends Component<Props> {
  render () {
    return <Query query={GET_DRAFT} variables={{slug: this.props.query.slug}}>
      {({loading, error, data}) => {
        if (loading || error) return null
        return <Box>
          <Helmet>
            <title>{`Draft ${data.draft.id}`}</title>
          </Helmet>

          <Text>{data.draft.body}</Text>
        </Box>
      }}
    </Query>
  }
}

export default DraftPage