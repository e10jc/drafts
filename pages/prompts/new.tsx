import gql from 'graphql-tag'
import Router from 'next/router'
import {Component} from 'react'
import {Mutation} from 'react-apollo'
import {Box, Button, Heading, Label, Input} from 'rebass'

const CREATE_PROMPT = gql`
  mutation ($title: String!) {
    createPrompt(title: $title) {
      id
      title
    }
  }
`

interface State {
  title: string,
}

class NewPromptPage extends Component<{}, State> {
  state = {
    title: '',
  }

  render () {
    return <Mutation
      mutation={CREATE_PROMPT}
      onError={({message}) => {
        alert(`Error: ${message}`)
      }}
      onCompleted={data => {
        Router.push('/prompts')
      }}
    >
      {(createPrompt) => <Box>
        <Heading>New Prompt</Heading>
        <form onSubmit={this.handleSubmit(createPrompt)}>
          <Label htmlFor='title'>Title</Label>
          <Input id='title' name='title' onChange={this.handleInputChange('title')} type='text' />
          <Button type='submit'>Submit</Button>
        </form>
      </Box>}
    </Mutation>
  }

  handleInputChange = key => e => {
    this.setState({...this.state, [key]: e.target.value})
  }

  handleSubmit = createPrompt => async e => {
    e.preventDefault()
    createPrompt({variables: {
      title: this.state.title,
    }})
  }
}

export default NewPromptPage