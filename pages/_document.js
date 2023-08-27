import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = context.renderPage;
    context.renderPage = () => originalRenderPage({
      enhanceApp: (app) => {
        sheet.collectStyles(app);
        return app;
      }
    });

    const props = await Document.getInitialProps(context);

    const styleTags = sheet.getStyleElement();

    return { ...props, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
          <script src="https://www.google.com/recaptcha/enterprise.js?render=6Lffh8AnAAAAAJEgHGW4hxQroFIXo7wM-lnF_-bG"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
