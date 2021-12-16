import * as React from "react";
import axios from "axios";

import { SocialWrapper } from "./socialWrapper";
import { State, useFetch } from "../../hooks/useFetch";
import Twitter from "../../images/twitter.svg";
import Like from "../../images/like.svg";
import Comment from "../../images/comment.svg";

interface ITwitter {
  createdAt: string;
  text: string;
  small: string | null;
  thumb: string | null;
  id: number;
  url: string;
}

export const TwitterFeed = () => {
  const { posts, state } = useFetch<ITwitter>("getTwitterPosts");

  if (state === State.Err) return null;

  return (
    <SocialWrapper
      Icon={Twitter}
      profile="@michalhonc"
      profileUrl="https://twitter.com/Michalhonc"
      className="TwitterFeed"
    >
      {state === State.Loading && <span>loading</span>}
      {posts.map((post: ITwitter) => (
        <a href={post.url} key={post.id}>
          <div
            className="TwitterFeed-tweet"
            dangerouslySetInnerHTML={{ __html: underlineHashtags(post.text) }}
          />
          <div className="TwitterFeed-imageWrapper">
            {post.small && (
              <img
                loading="lazy"
                width="120"
                height="80"
                src={post.small}
                alt="@michalhonc Twitter profile"
              />
            )}
          </div>
        </a>
      ))}
    </SocialWrapper>
  );
};

function underlineHashtags(text: string) {
  return text
    .split(" ")
    .map((str) =>
      str.startsWith("#") || str.startsWith("@")
        ? `<span class="underline">${str}</span>`
        : str
    )
    .join(" ");
}
