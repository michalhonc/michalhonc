import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useIntl, Link, WrappedComponentProps } from "gatsby-plugin-intl";
import Img from "gatsby-image/withIEPolyfill";

import { prepareData } from "../../pages/blog";

const Query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date
            language
            title
            path
            description
            thumbnail {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

const MorePosts = ({ intl }: WrappedComponentProps) => (
  <>
    {intl.formatMessage({ id: "more_posts" })}
    {String.fromCharCode(160)}
    {String.fromCharCode(187)}
  </>
);

export const Teaser: React.FC = () => {
  const intl = useIntl();
  const { allMarkdownRemark } = useStaticQuery(Query);
  const [firstPost, ...others] = prepareData(allMarkdownRemark, intl);

  return (
    <section className="Container Teaser">
      <h2
        dangerouslySetInnerHTML={{
          __html: intl.formatMessage({ id: "teaser_title" }),
        }}
      />

      <div className="Teaser-wrapper">
        {others.slice(0, 2).map(({ node }) => {
          const { title, path, description, thumbnail } = node.frontmatter;
          return (
            <article key={path}>
              <Link to={path} aria-label={`Link to blog post: ${title}`}>
                <Img
                  objectFit="contain"
                  fluid={thumbnail.childImageSharp.fluid}
                />
              </Link>
              <div className="Teaser-row">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link className="underline" to={path}>
                  <MorePosts intl={intl} />
                </Link>
              </div>
            </article>
          );
        })}

        {firstPost && (
          <article key={firstPost.node.frontmatter.path}>
            <Link
              to={firstPost.node.frontmatter.path}
              aria-label={`Link to blog post: ${firstPost.node.frontmatter.title}`}
            >
              <Img
                objectFit="contain"
                fluid={
                  firstPost.node.frontmatter.thumbnail.childImageSharp.fluid
                }
              />
            </Link>
            <div className="Teaser-row">
              <h3>{firstPost.node.frontmatter.title}</h3>
              <p>{firstPost.node.frontmatter.description}</p>
              <Link className="underline" to={firstPost.node.frontmatter.path}>
                <MorePosts intl={intl} />
              </Link>
            </div>
          </article>
        )}
      </div>

      <Link className="Teaser-more underline" to="/blog">
        <MorePosts intl={intl} />
      </Link>
    </section>
  );
};
