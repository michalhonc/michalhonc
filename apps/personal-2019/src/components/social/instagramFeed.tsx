import * as React from "react";
import axios from "axios";

import { SocialWrapper } from "./socialWrapper";
import { State, useFetch } from "../../hooks/useFetch";
import Instagram from "../../images/instagram.svg";
import Like from "../../images/like.svg";
import Comment from "../../images/comment.svg";

interface IInstagram {
  big: string;
  small: string;
  url: string;
  caption: string;
  likes: number;
  comments: number;
  id: number;
}

export const InstagramFeed = () => {
  const { posts, state } = useFetch<IInstagram>("getInstagramPosts");

  if (state === State.Err) return null;

  return (
    <SocialWrapper
      Icon={Instagram}
      profile="@michalhonc.cz"
      profileUrl="https://www.instagram.com/michalhonc.cz/"
      className="InstagramFeed"
    >
      {state === State.Loading &&
        [...Array(6)].map((_, i) => (
          <a href="#" key={i}>
            <div className="InstagramFeed-imageWrapper--fake" />
          </a>
        ))}

      {posts.map((post: IInstagram) => (
        <a href={post.url} key={post.id}>
          <div className="InstagramFeed-imageWrapper">
            <img
              loading="lazy"
              width="200"
              height="200"
              src={post.small}
              alt="@michalhonc.cz Instagram profile"
            />
          </div>
          <div className="InstagramFeed-meta">
            {post.likes > 0 && (
              <span>
                {post.likes} <Like />
              </span>
            )}
            {post.comments > 0 && (
              <span>
                {post.comments} <Comment />
              </span>
            )}
          </div>
        </a>
      ))}
    </SocialWrapper>
  );
};
