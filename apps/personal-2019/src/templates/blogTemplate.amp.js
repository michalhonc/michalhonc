import React from "react";
import { injectIntl, Link } from "gatsby-plugin-intl";

import { SEO } from "../components/seo";
import { Footer } from "../components/footer";
import { Header } from "../components/blog/header";
import BackSvg from "../images/back-button.svg";

import "../styles/blog.scss";
import "../styles/prism.scss";

const Template = ({ pageContext, intl, location }) => {
  const { frontmatter, html } = pageContext;
  return (
    <div className="Blog">
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        isAmp
      >
        <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js" />
        <meta
          name="thumbnail"
          content={
            location.origin +
            frontmatter.thumbnail.childImageSharp.fluid.srcWebp
          }
        />
        <meta
          name="image"
          property="og:image"
          content={
            location.origin +
            frontmatter.thumbnail.childImageSharp.fluid.srcWebp
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:locale"
          content={intl.locale === "cs" ? "cs_CZ" : "en_US"}
        />
      </SEO>

      <Header canChangeLocal={false} />

      <main>
        <Link to="/blog" className="Blog-goBack">
          <BackSvg />
        </Link>
        <article>
          <header>
            <h1>{frontmatter.title}</h1>
            <span>
              {frontmatter.date} ⁓ <Link to="/">Michal Honc</Link>
            </span>
          </header>
          <figure className="Blog-thumbnail">
            <img alt="thumbnail" src={frontmatter.thumbnail.childImageSharp.fluid.srcWebp} />
          </figure>
          <section dangerouslySetInnerHTML={{ __html: html }} />
          <hr />
          <section>
            <h2>{intl.formatMessage({ id: "blog_author-title" })}</h2>
            <p>{intl.formatMessage({ id: "blog_author-content" })}></p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default injectIntl(Template);
