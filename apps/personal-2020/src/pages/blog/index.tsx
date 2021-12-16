import react from "react";
import Link from "next/link";
import matter from "gray-matter";
const glob = require("glob");

import Logo from "../../assets/images/logo.svg";
import {
  Blog,
  BlogPageWrapper,
} from "../../components/BlogSection/BlogSection";

const BlogPage = ({ blogs }) => {
  return (
    <>
      <Link href="/">
        <a>
          <Logo
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              width: "200px",
              height: "60px",
            }}
          />
        </a>
      </Link>
      <div style={{ height: "50px", background: "var(--c-gamma)" }} />
      <BlogPageWrapper>
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.data.path} />
        ))}
      </BlogPageWrapper>
    </>
  );
};

export default BlogPage;

export async function getStaticProps() {
  const blogFiles = glob.sync("src/markdown/**/*.md");
  const blogSlugs = blogFiles.map((file) =>
    file.split("/")[2].replace(/ /g, "-").slice(0, -3).trim()
  );

  const blogs = await Promise.all(
    blogSlugs.map(async (slug) => {
      const content = await import(`../../markdown/${slug}.md`);
      return { data: matter(content.default).data };
    })
  );

  return {
    props: {
      blogs,
    },
  };
}
