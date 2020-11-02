import next from "next";
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
        <meta name="description" content="・・・" />
        <meta
          name="format-detection"
          content="telephone=no,address=no,email=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Atsuya Kobayashi</title>
        <script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        ></script>
        <link rel="shortcut icon" href="./img/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
