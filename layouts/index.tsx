import {Box, Container, Provider, Text} from 'rebass'
import styled, {injectGlobal} from 'styled-components'

injectGlobal`
  body, html {
    margin: 0;
  }
`

export default ({children}) => <Provider>
  <Wrapper>
    <Box bg='black' color='white'>
      <Container>
        <Box>Drafts</Box>
      </Container>
    </Box>
    <Box flex='1'>
      <Container>
        {children}
      </Container>
    </Box>
    <Box bg='black' color='white'>
      <Container>
        <Text>&copy;{new Date().getFullYear()} Drafts</Text>
      </Container>
    </Box>
  </Wrapper>
</Provider>

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
