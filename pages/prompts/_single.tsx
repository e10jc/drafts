import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'
import Helmet from 'react-helmet'
import {Box, Heading, Link} from 'rebass'

interface Props {
  query: {
    slug: string,
  }
}

const GET_PROMPT = gql`
  query prompt($slug: String!) {
    prompt(slug: $slug) {
      drafts {
        body
        id
        slug
      }
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

          {data.prompt.drafts.map(draft => <Box key={draft.id}>
            <Link href={`/drafts/${draft.slug}`}>Draft {draft.id}</Link>
          </Box>)}

          <Link href={`/drafts/new?promptId=${data.prompt.id}`}>New draft</Link>
        </Box>
      }}
    </Query>
  }
}

export default PromptPage