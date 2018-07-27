import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'
import Helmet from 'react-helmet'
import {Box, Heading} from 'rebass'

interface Props {
  query: {
    slug: string,
  }
}

const GET_PROMPT = gql`
  query prompt($slug: String!) {
    prompt(slug: $slug) {
      id
      title
    }
  }
`

class PromptPage extends Component<Props> {
  render () {
    return <Query query={GET_PROMPT} variables={{slug: this.props.query.slug}}>
      {({loading, error, data}) => {
        if (loading || error) return null
        return <Box>
          <Helmet>
            <title>{data.prompt.title}</title>
          </Helmet>

          <Heading>{data.prompt.title}</Heading>
        </Box>
      }}
    </Query>
  }
}

export default PromptPage