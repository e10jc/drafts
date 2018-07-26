import {Box, Container, Provider, Text} from 'rebass'
import styled, {injectGlobal} from 'styled-components'

import Header from '../components/header'

injectGlobal`
  body, html {
    margin: 0;
  }
`

export default ({children}) => <Provider>
  <Wrapper>
    <Header />
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
