require("dotenv").config();

module.exports = {
  siteMetadata: {
    author: "Michal Honc",
    title: "Michal Honc",
    description:
      "První konzultace ZDARMA! Vytvořím Vám rychlé a moderní webové stránky, se kterýma Vy nebo Váš produkt uspějete. Sjednejte si konzultaci zdarma během jedné minuty",
    siteUrl: "https://michalhonc.cz",
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://michalhonc.cz",
        sitemap: "https://michalhonc.cz/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
              path
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map((edge) => ({
            url: site.siteMetadata.siteUrl + edge.node.path,
            changefreq: "daily",
            priority: 0.7,
          })),
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/, // See below to configure properly
        },
      },
    },
    {
      resolve: "gatsby-plugin-intl",
      options: {
        path: `${__dirname}/src/i18n`,
        languages: ["cs", "en"],
        defaultLanguage: "cs",
        redirect: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-155168574-1",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: "100",
              icon: '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: "Blog-share",
              maintainCase: false,
              removeAccents: true,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 700,
              withWebp: true,
              showCaptions: true,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "src/images",
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-amp",
      options: {
        analytics: {
          type: "googleanalytics",
          dataCredentials: "include",
          config: {
            vars: {
              gtag_id: "UA-155168574-1",
              config: {
                "UA-155168574-1": {
                  page_location: "{{pathname}}",
                },
              },
            },
          },
        },
        canonicalBaseUrl: "https://michalhonc.cz",
        components: ["amp-form"],
        includedPaths: ["/blog/*"],
        pathIdentifier: "/amp",
        relAmpHtmlPattern: "{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}",
        relCanonicalPattern: "{{canonicalBaseUrl}}/{{pathname}}",
        useAmpClientIdApi: true,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://michalhonc.us4.list-manage.com/subscribe/post?u=084e2707ddc0142a945d67d73&amp;id=94b0c65662",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sass",
    // `gatsby-plugin-offline`,
  ],
};
