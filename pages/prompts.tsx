import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Helmet from 'react-helmet'
import {Box, Heading} from 'rebass'

import Link from '../components/link'

export const GET_PROMPTS = gql`
  query {
    prompts {
      id
      slug
      title
    }
  }
`

const PromptsPage = () => <Query query={GET_PROMPTS}>
  {({loading, error, data}) => {
    if (loading || error) return null
    return <Box>
      <Helmet>
        <title>Prompts</title>
      </Helmet>

      <Heading>Prompts</Heading>

      {data.prompts.map(prompt => <Box key={prompt.id}>
        <Heading fontSize={4}>
          <Link href={`/prompts/${prompt.slug}`}>{prompt.title}</Link>
        </Heading>
      </Box>)}

      <Link href='/prompts/new'>New prompt</Link>
    </Box>
  }}
</Query>

export default PromptsPage