const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/michalhonc/git/freelance/michalhonc/apps/personal-2019/.cache/dev-404-page.js"))),
  "component---src-pages-404-tsx": hot(preferDefault(require("/Users/michalhonc/git/freelance/michalhonc/apps/personal-2019/src/pages/404.tsx"))),
  "component---src-pages-blog-tsx": hot(preferDefault(require("/Users/michalhonc/git/freelance/michalhonc/apps/personal-2019/src/pages/blog.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/Users/michalhonc/git/freelance/michalhonc/apps/personal-2019/src/pages/index.tsx"))),
  "component---src-templates-blog-template-amp-js": hot(preferDefault(require("/Users/michalhonc/git/freelance/michalhonc/apps/personal-2019/src/templates/blogTemplate.amp.js"))),
  "component---src-templates-blog-template-js": hot(preferDefault(require("/Users/michalhonc/git/freelance/michalhonc/apps/personal-2019/src/templates/blogTemplate.js")))
}

