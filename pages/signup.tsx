import gql from 'graphql-tag'
import {Component} from 'react'
import {Mutation} from 'react-apollo'
import {Box, Button, Label, Input} from 'rebass'

import Layout from '../layouts'
import WithApollo from '../components/with-apollo'

const CREATE_USER = gql`
  mutation ($email: String!, $password: String!) {
    token: createUser(email: $email, password: $password) 
  }
`

interface State {
  email: string,
  password: string,
}

class SignupPage extends Component<{}, State> {
  state = {
    email: '',
    password: '',
  }

  render () {
    return <Mutation mutation={CREATE_USER}>
      {(createUser, {data}) => <Layout>
        <Box>
          <form onSubmit={this.handleSubmit(createUser)}>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' name='email' onChange={this.handleInputChange('email')} type='email' />
            <Label htmlFor='password'>Password</Label>
            <Input id='password' name='password' onChange={this.handleInputChange('password')} type='password' />
            <Button type='submit'>Submit</Button>
          </form>
        </Box>
      </Layout>}
    </Mutation>
  }

  handleInputChange = key => e => {
    this.setState({...this.state, [key]: e.target.value})
  }

  handleSubmit = createUser => async e => {
    e.preventDefault()
    
    const data = await createUser({variables: {
      email: this.state.email,
      password: this.state.password,
    }})
  }
}

export default WithApollo(SignupPage)