import Document, {Head, Main, NextScript} from 'next/document'
import Helmet from 'react-helmet'
import {ServerStyleSheet} from 'styled-components'

export default class extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return {...page, styleTags, user: ctx.req.user}
  }

  render () {
    const helmet = Helmet.renderStatic()

    return (
      <html {...helmet.htmlAttributes.toComponent}>
        <Head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {this.props.styleTags}
        </Head>
        <body {...helmet.bodyAttributes.toComponent}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
