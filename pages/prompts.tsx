import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {Box} from 'rebass'

import WithApollo from '../components/with-apollo'
import Layout from '../layouts'

const PROMPTS = gql`
  query {
    prompts {
      id
      title
    }
  }
`

const PromptsPage = () => <Query query={PROMPTS}>
  {data => <Layout>
    <Box>
      prompts
    </Box>
  </Layout>}
</Query>

export default WithApollo(PromptsPage)