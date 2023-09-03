import { renderStatic } from "utils/renderer";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import Script from "next/script";
import { KAKAO_URL, NEXT_PUBLIC_KAKAO_APP_JS_KEY } from "api/open-api";

const KAKAO_SDK_URL = `${KAKAO_URL}/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const page = await ctx.renderPage();
    const { css, ids } = await renderStatic(page.html);

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <style
              data-emotion={`css ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <link rel="icon" href="/assets/favicon.ico" />
          <Script
            src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
            type="text/javascript"
          />
          <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <NextScript />
      </Html>
    );
  }
}
