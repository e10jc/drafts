import {Component} from 'react'
import {Box, Button, Label, Input} from 'rebass'

import Layout from '../layouts'

export default class extends Component<{}> {
  render () {
    return <Layout>
      <Box>
        <form>
          <Label for='email'>Email</Label>
          <Input id='email' name='email' type='email' />
          <Label for='password'>Password</Label>
          <Input id='password' name='password' type='password' />
          <Button type='submit'>Submit</Button>
        </form>
      </Box>
    </Layout>
  }
}