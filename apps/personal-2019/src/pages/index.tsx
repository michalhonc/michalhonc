import React from "react";
import { Link } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";

import { Header } from "../components/header";
import { Presentation } from "../components/presentation";
import { Social } from "../components/social/social";
import { Teaser } from "../components/blog/teaser";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

const IndexPage = () => {
  const intl = useIntl();
  return (
    <Layout>
      <SEO
        title={intl.formatMessage({ id: "documentTitle" })}
        description={intl.formatMessage({ id: "documentDesc" })}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand&display=fallback"
          rel="stylesheet"
        />
      </SEO>
      <Header />
      <Presentation />
      <Teaser />
      <Social />
    </Layout>
  );
};

export default IndexPage;
