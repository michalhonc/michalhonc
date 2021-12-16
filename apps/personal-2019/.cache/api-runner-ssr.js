var plugins = [{
      plugin: require('/Users/michalhonc/git/freelance/michalhonc/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/michalhonc/git/freelance/michalhonc/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"query":"\n        {\n          site {\n            siteMetadata {\n              siteUrl\n            }\n          }\n\n          allSitePage {\n            edges {\n              node {\n              path\n              }\n            }\n          }\n        }","output":"/sitemap.xml","createLinkInHead":true},
    },{
      plugin: require('/Users/michalhonc/git/freelance/michalhonc/node_modules/gatsby-plugin-intl/gatsby-ssr'),
      options: {"plugins":[],"path":"/Users/michalhonc/git/freelance/michalhonc/apps/personal-2019/src/i18n","languages":["cs","en"],"defaultLanguage":"cs","redirect":true},
    },{
      plugin: require('/Users/michalhonc/git/freelance/michalhonc/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-155168574-1","head":false,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0},
    },{
      plugin: require('/Users/michalhonc/git/freelance/michalhonc/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[],"offsetY":100,"icon":"<svg aria-hidden=\"true\" height=\"20\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"20\"><path fill-rule=\"evenodd\" d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg>","className":"Blog-share","maintainCase":false,"removeAccents":true},
    },{
      plugin: require('/Users/michalhonc/git/freelance/michalhonc/node_modules/gatsby-plugin-amp/gatsby-ssr'),
      options: {"plugins":[],"analytics":{"type":"googleanalytics","dataCredentials":"include","config":{"vars":{"gtag_id":"UA-155168574-1","config":{"UA-155168574-1":{"page_location":"{{pathname}}"}}}}},"canonicalBaseUrl":"https://michalhonc.cz","components":["amp-form"],"includedPaths":["/blog/*"],"pathIdentifier":"/amp","relAmpHtmlPattern":"{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}","relCanonicalPattern":"{{canonicalBaseUrl}}/{{pathname}}","useAmpClientIdApi":true},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
