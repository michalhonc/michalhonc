const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve("src/templates/blogTemplate.js");
  const blogPostTemplateAMP = path.resolve("src/templates/blogTemplate.amp.js");
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              date
              path
              title
              description
              category
              language
              thumbnail {
                childImageSharp {
                  fluid {
                    srcWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query for blog.");
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        ...node,
      },
    });

    createPage({
      path: `${node.frontmatter.path}/amp`,
      component: blogPostTemplateAMP,
      context: {
        ...node,
      },
    });
  });
};
