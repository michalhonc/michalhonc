import React from "react";
import Link from "next/link";

import css from "./BlogSection.module.scss";

import PhoneDark from "../../assets/images/phone-dark.svg";
import WeirdWave from "../../assets/images/weird-wave.svg";

export const blogPosts = [
  "difference-between-event-targets-in-javascript",
  "7-ways-to-bypass-adblock",
  "variable-fonts",
  "difference-between-inherit-initial-unset-and-revert",
];

export function BlogSection({ blogs }) {
  return (
    <section className={css.container}>
      <div className={css.phoneDark}>
        <PhoneDark />
      </div>

      <div className={css.content}>
        <h2 className={css.heading}>Articles</h2>
        <div className={css.blogWrapper}>
          <div className={css.weirdWave}>
            <WeirdWave />
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.data.path} blog={blog} />
          ))}
        </div>
        <div className={css.more}>
          <Link href="/blog">
            <a className="underline-alpha">
              more articles {String.fromCharCode(187)}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BlogWrapper({ children }) {
  return <div className={css.blogWrapper}>{children}</div>;
}

export function BlogPageWrapper({ children }) {
  return (
    <section className={css.container}>
      <h2 className={css.heading}>Articles</h2>
      <div className={css.blogWrapper}>{children}</div>
    </section>
  );
}

export function Blog({ blog }) {
  return (
    <div className={css.blog}>
      <Link href={blog.data.path}>
        <a className={css.title}>
          <h3>{blog.data.title}</h3>
        </a>
      </Link>
      <span className={css.description}>{blog.data.description}</span>
    </div>
  );
}
