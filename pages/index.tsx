import Helmet from 'react-helmet'
import {Component} from 'react'
import {Box} from 'rebass'

import Layout from '../layouts'

export default class extends Component<{}> {
  static async getInitialProps () {
    return {}
  }

  render () {
    return (
      <Layout>
        <Helmet>
          <title>Drafts</title>
        </Helmet>
        <Box>hey</Box>
      </Layout>
    )
  }
}
