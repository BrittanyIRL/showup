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
  html {
    font-size: 10px;
  }
  h1 { 
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  
  body {
    font-size: 1.6rem;
    line-height: 1.4;
    font-weight: 400;
    padding: 0;
    margin-top: 7rem;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.black};
    @media only screen and (max-width: 600px) {
      margin-top: 9rem;
    }
  }
  a {
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: none;
    border-bottom: ${({ theme }) => `2px dashed ${theme.colors.blue}`};
    cursor: pointer;

    &:hover {
      font-style: italic;
      border-bottom: ${({ theme }) => `2px dashed ${theme.colors.yellow}`};
    }
    &:focus-visible {
      outline: ${({ theme }) => `2px dotted ${theme.colors.yellow}`};
    }
  }

  button {
    outline: none;
    background-color: transparent;
    border: none;
    box-shadow: none;
    cursor: pointer;

    &:focus-visible {
      outline: ${({ theme }) => `2px dotted ${theme.colors.yellow}`};
    }
  }
`;

function MyApp({ Component, pageProps, apollo }) {
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
