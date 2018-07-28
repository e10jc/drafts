import gql from 'graphql-tag'
import Helmet from 'react-helmet'
import {Query} from 'react-apollo'
import {Box, Heading} from 'rebass'

import {AuthContext} from './_app'
import Link from '../components/link'

const GQL = gql`
  query {
    prompts {
      drafts {
        id
        slug
        user {
          id
          handle
        }
      }
      id
      title
    }
  }
`

const HomePage = () => <AuthContext.Consumer>
  {user => <Query query={GQL}>
    {({loading, error, data}) => {
      if (loading || error) return null
      return <Box>
        <Helmet>
          <title>Drafts</title>
        </Helmet>

        <Heading mb={3}>Home</Heading>

        {data.prompts.map(prompt => <Box key={prompt.id} mb={3}>
          <Heading fontSize={4} mb={2}>{prompt.title}</Heading>
          {prompt.drafts.map(draft => <Box key={draft.id} mb={2}>
            <Link href={`/@${draft.user.handle}/${draft.slug}`}>Draft {draft.id} by @{draft.user.handle}</Link>
          </Box>)}
          <Link href={`/drafts/new?promptId=${prompt.id}`}>New draft</Link>
        </Box>)}

        {user && user.isAdmin && <Box>
          <Link href='/prompts/new'>New prompt</Link>
        </Box>}
      </Box>}}
    </Query>}
  </AuthContext.Consumer>

export default HomePage