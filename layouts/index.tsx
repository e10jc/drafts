import {Box, Container, Text} from 'rebass'
import styled, {injectGlobal} from 'styled-components'

import WithApollo from '../components/with-apollo'

injectGlobal`
  body, html {
    margin: 0;
  }
`

const Layout = ({children}) => <Wrapper>
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

export default WithApollo(Layout)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
