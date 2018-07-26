import Link from 'next/link'
import {Box, Container, Flex} from 'rebass'

export default () => <Box bg='black' color='white'>
  <Container>
    <Flex justifyContent='space-between'>
      <Link href='/'>Drafts</Link>
    </Flex>
  </Container>
</Box>