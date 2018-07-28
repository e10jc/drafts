import {Box, Container, Flex, Text} from 'rebass'

import Link from '../components/link'

export default () => <Box bg='black' color='white'>
  <Container>
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex>
        <Link color='white' href='/prompts' p={1}>Prompts</Link>
      </Flex>
      <Box>
        <Text>&copy;{new Date().getFullYear()} Drafts</Text>
      </Box>
    </Flex>
  </Container>
</Box>