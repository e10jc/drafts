import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Helmet from 'react-helmet'
import {Box, Heading} from 'rebass'

const PROMPTS = gql`
  query {
    prompts {
      id
      title
    }
  }
`

const PromptsPage = () => <Query query={PROMPTS}>
  {({loading, error, data}) => {
    if (loading || error) return null
    return <Box>
      <Helmet>
        <title>Prompts</title>
      </Helmet>

      <Heading>Prompts</Heading>

      {data.prompts.map(prompt => <Box key={prompt.id}>
        <Heading fontSize={4}>{prompt.title}</Heading>
      </Box>)}
    </Box>
  }}
</Query>

export default PromptsPage