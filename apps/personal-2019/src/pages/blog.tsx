import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useIntl, Link, IntlShape } from "gatsby-plugin-intl";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image/withIEPolyfill";

import { SEO } from "../components/seo";
import { Header } from "../components/blog/header";

interface IBlogPost {
  node: {
    frontmatter: {
      date: string;
      language: string;
      title: string;
      path: string;
      description: string;
      thumbnail: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
}

interface IEdges {
  edges: Array<IBlogPost>;
}

interface IQuery {
  allMarkdownRemark: IEdges;
}

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

const Blog = () => {
  const intl = useIntl();
  const { allMarkdownRemark }: IQuery = useStaticQuery(Query);
  const [firstPost, ...others] = prepareData(allMarkdownRemark, intl);

  return (
    <div className="Blog">
      <SEO
        title={intl.formatMessage({ id: "blogTitle" })}
        description={intl.formatMessage({ id: "blogTitle" })}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400&display=fallback"
          rel="stylesheet"
        />
      </SEO>
      <Header />
      <main>
        {firstPost && (
          <article>
            <Link className="Blog-recent" to={firstPost.node.frontmatter.path}>
              <Img
                fluid={
                  firstPost.node.frontmatter.thumbnail.childImageSharp.fluid
                }
              />
              <div className="Blog-recent-header">
                <h2>{firstPost.node.frontmatter.title}</h2>
                <p>{firstPost.node.frontmatter.description}</p>
              </div>
            </Link>
          </article>
        )}

        <hr />

        {others.map(({ node }) => {
          const { title, path, description, thumbnail } = node.frontmatter;
          return (
            <article key={path}>
              <Link className="Blog-past" to={path}>
                <Img
                  objectFit="contain"
                  fluid={thumbnail.childImageSharp.fluid}
                />
                <div className="Blog-past-header">
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </main>
    </div>
  );
};

export function prepareData({ edges }: IEdges, intl: IntlShape) {
  const langEdges = edges.filter(
    ({ node }) => node.frontmatter.language === intl.locale
  );
  const sortedEdges = langEdges.sort((a, b) => parseDate(b) - parseDate(a));
  return sortedEdges;
}

function parseDate(obj: IBlogPost) {
  return new Date(obj.node.frontmatter.date).getTime();
}

export default Blog;
