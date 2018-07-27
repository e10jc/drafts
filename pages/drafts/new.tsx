import gql from 'graphql-tag'
import Router from 'next/router'
import {Component} from 'react'
import {Mutation} from 'react-apollo'
import {Box, Button, Heading, Label, Textarea} from 'rebass'

const CREATE_DRAFT = gql`
  mutation ($promptId: Int!, $body: String!) {
    createDraft(promptId: $promptId, body: $body) {
      body
      id
      slug
    }
  }
`

interface Props {
  query: {
    promptId: string,
  }
}

interface State {
  body: string,
}

class NewDraftPage extends Component<Props, State> {
  state = {
    body: '',
  }

  render () {
    return <Mutation
      mutation={CREATE_DRAFT}
      onError={({message}) => {
        alert(`Error: ${message}`)
      }}
      onCompleted={data => {
        console.log(data)
      }}
    >
      {(createDraft) => <Box>
        <Heading>New Draft</Heading>
        <form onSubmit={this.handleSubmit(createDraft)}>
          <Label htmlFor='body'>Body</Label>
          <Textarea id='body' name='body' onChange={this.handleInputChange('body')} />
          <Button type='submit'>Submit</Button>
        </form>
      </Box>}
    </Mutation>
  }

  handleInputChange = key => e => {
    this.setState({...this.state, [key]: e.target.value})
  }

  handleSubmit = createDraft => async e => {
    e.preventDefault()
    createDraft({variables: {
      body: this.state.body,
      promptId: this.props.query.promptId,
    }})
  }
}

export default NewDraftPage