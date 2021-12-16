import axios from "axios";
import { useState, useEffect, useCallback } from "react";

import { conf } from "../conf";

// Dev Data
import { TWITTER_DEV_DATA } from "../../data/devData";
import { INSTAGRAM_DEV_DATA } from "../../data/devData";

export enum State {
  Init = "init",
  Loading = "loading",
  Err = "error",
  Success = "success",
}

export interface IUseFetch<T> {
  posts: T;
  state: State;
}

export const useFetch = <T>(
  method: "getInstagramPosts" | "getTwitterPosts"
) => {
  const [posts, setPosts] = useState<T[]>([]);
  const [state, setState] = useState<State>(State.Init);

  const url = conf.NETLIFY_FUNCTIONS_BASE + method;

  useEffect(() => {
    async function getPosts() {
      try {
        setState(State.Loading);
        const { data } = await axios.get(url);
        setState(State.Success);
        setPosts(data);
      } catch {
        setState(State.Err);
      }
    }

    getPosts();
  }, []);

  return { posts, state };
};
