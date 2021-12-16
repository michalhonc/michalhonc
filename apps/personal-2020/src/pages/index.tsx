import matter from "gray-matter";
const glob = require("glob");

import { Lander, BlogSection, Footer } from "../components";
import { blogPosts } from "../components/BlogSection/BlogSection";

function Index({ blogs }) {
  return (
    <>
      <Lander />
      <BlogSection blogs={blogs} />
      <Footer />
    </>
  );
}

export default Index;

export async function getStaticProps() {
  const frontmatters = await Promise.all(
    blogPosts.map(async (blogPost) => {
      const content = await import(`../markdown/${blogPost}.md`);
      const data = matter(content.default);

      return {
        data: data.data,
      };
    })
  );

  return {
    props: {
      blogs: frontmatters,
    },
  };
}
