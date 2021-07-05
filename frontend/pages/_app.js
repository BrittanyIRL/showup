import { ApolloProvider } from "@apollo/client";
import NProgress from "nprogress";
import Router from "next/router";
import { Page } from "../components";
// import "../components/styles/nprogress.css";
import withData from "../lib/withData";
import "../theme/normalize.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "../theme/theme";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }
  h1 { 
    font-family: 'Courier Prime', monospace;
  }
`;

function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
