import gql from 'graphql-tag'
import Helmet from 'react-helmet'
import {Query} from 'react-apollo'
import {Box} from 'rebass'

import Layout from '../layouts'
import WithApollo from '../components/with-apollo'

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
  {({loading, error, data}) => <Layout>
    <Helmet>
      <title>Drafts</title>
    </Helmet>

    {data && data.drafts && data.drafts.map(draft => <Box key={draft.id}>
      {draft.id}
    </Box>)}
  </Layout>}
</Query>

export default WithApollo(HomePage)