import react from "react";
import matter from "gray-matter";
const glob = require("glob");

import { BlogPost } from "../../components/BlogPost/BlogPost";

const Blog = ({ frontmatter, markdownBody, siteTitle }) => {
  return <BlogPost frontmatter={frontmatter} markdownBody={markdownBody} />;
};

export default Blog;

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const content = await import(`../../markdown/${slug}.md`);
  //const config = await import(`../../data/config.json`)
  const data = matter(content.default);

  return {
    props: {
      //siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  //get all .md files in the posts dir
  const blogs = glob.sync("src/markdown/**/*.md");

  //remove path and extension to leave filename only
  const blogSlugs = blogs.map((file) =>
    file.split("/")[2].replace(/ /g, "-").slice(0, -3).trim()
  );

  // create paths with `slug` param
  const paths = blogSlugs.map((slug) => `/blog/${slug}`);
  return {
    paths,
    fallback: false,
  };
}
