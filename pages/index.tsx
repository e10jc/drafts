import gql from 'graphql-tag'
import Helmet from 'react-helmet'
import {Query} from 'react-apollo'
import {Box, Heading} from 'rebass'

const GQL = gql`
  query {
    drafts {
      id
      prompt {
        id
      }
      user {
        email
        id
      }
    }
  }
`

const HomePage = () => <Query query={GQL}>
  {({loading, error, data}) => {
    if (loading || error) return null
    return <Box>
      <Helmet>
        <title>Drafts</title>
      </Helmet>

      <Heading>Drafts</Heading>

      {data.drafts.map(draft => <Box key={draft.id}>
        {draft.id}
      </Box>)}
    </Box>
  }}
</Query>

export default HomePage