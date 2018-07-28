import {Box, Container, Flex, Text} from 'rebass'

export default () => <Box bg='black' color='white'>
  <Container>
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex>
      </Flex>
      <Box>
        <Text p={1}>&copy;{new Date().getFullYear()} Drafts</Text>
      </Box>
    </Flex>
  </Container>
</Box>