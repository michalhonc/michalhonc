import "sanitize.css";
import "../styles/globals.css";
import "../styles/variables.css";

import React from "react";
import Head from "next/head";
import App, { AppProps } from "next/app";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (router.pathname.startsWith("/se-zeni")) {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Svatba | Michal Honc a Victoria Matsakyanová</title>
          <meta name="description" content="" />
          <meta name="theme-color" content="#fff" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Developer of mobile and web applications | Michal Honc</title>
        <meta
          name="description"
          content="Let me help you solve your problems with web and mobile applications. Arrange a free consultation about your problem."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#FFDC4E" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
