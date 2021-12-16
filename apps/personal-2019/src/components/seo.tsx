import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Query = graphql`
  query {
    site {
      siteMetadata {
        author
        description
        title
      }
    }
  }
`;

interface IProps {
  description: string;
  lang?: string;
  meta?: any;
  title: string;
  isAmp?: boolean;
  isBlog?: boolean;
}

export const SEO: React.FC<IProps> = ({
  description = "",
  lang = "cs",
  title,
  children,
  isAmp = false,
  isBlog = false,
}) => {
  const { site } = useStaticQuery(Query);

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate="Michal Honc | %s"
    >
      {/* Meta */}
      <meta name="title" content={title} />
      <meta name="author" content="Michal Honc" />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      {!isBlog && <meta property="og:type" content="website" />}
      <meta property="og:site_name" content="Michalhonc.cz" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="theme-color" content="#04776A" />
      <meta name="msapplication-TileColor" content="#04776A" />
      <meta name="seznam-wmt" content="EQop13vLy8aOqIKt4HsoFOsAONHrKesQ" />
      {!isAmp && <link rel="canonical" href="https://michalhonc.cz" />}

      {/* External materials */}
      {!isAmp && (
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        />
      )}

      {/* Favicons */}
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
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#04776A" />

      {children}
    </Helmet>
  );
};
