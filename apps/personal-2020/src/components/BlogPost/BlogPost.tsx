import React from "react";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import ReactMarkdown from "react-markdown";

import css from "./BlogPost.module.scss";

import Logo from "../../assets/images/logo.svg";

export const BlogPost = ({ frontmatter, markdownBody }) => {
  return (
    <>
      <Head>
        <title>{`${frontmatter.title} | Michal Honc`}</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/prism.min.js" />
      <div className={css.body}>
        <Link href="/">
          <a>
            <Logo className={css.logo} />
          </a>
        </Link>

        <div className={css.container}>
          <ReactMarkdown escapeHtml={true} source={markdownBody} />
        </div>
      </div>
    </>
  );
};
