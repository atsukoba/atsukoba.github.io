import { Fragment } from "react";
import Head from "next/head";
import "../sass/style.scss";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="Atsuya Kobayashi's Website" />
        <meta
          name="format-detection"
          content="telephone=no,address=no,email=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="google-site-verification"
          content="cI4es2OEvugGtOnNFAZf8XS1notJSgqSMmUlprSqjaM"
        />
        <title>Atsuya Kobayashi</title>
      </Head>
      <Header />
      <div style={{ width: "100vw", paddingTop: "75px" }}></div>
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
