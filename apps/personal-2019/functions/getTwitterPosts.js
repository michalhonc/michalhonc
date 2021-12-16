const axios = require("axios");

const twitterUrl =
  "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Michalhonc&count=10";

const CACHE_VALIDATION_TIME = 7200000; // 120 minutes

const cache = {
  lastFetch: 0,
  posts: [],
};

async function getPosts() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= CACHE_VALIDATION_TIME) {
    return cache.posts;
  }

  try {
    const { data } = await axios.get(twitterUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    const posts = slimTwitter(data);

    updateCache(posts);

    return posts;
  } catch {
    return [];
  }
}

function slimTwitter(response) {
  const posts = response.filter(
    ({ in_reply_to_status_id }) => !in_reply_to_status_id
  );
  return posts
    .map((post) => {
      const img = post.entities.media && post.entities.media[0];
      return {
        createdAt: post.created_at,
        text: post.text,
        small: img ? `${img.media_url}:small` : null,
        thumb: img ? `${img.media_url}:thumb` : null,
        id: post.id,
        url: `https://twitter.com/Michalhonc/status/${post.id_str}`,
      };
    })
    .slice(0, 6);
}

function updateCache(posts) {
  // Doesn't work on localhost
  cache.lastFetch = Date.now();
  cache.posts = posts;
}

exports.handler = async (event, context) => {
  const posts = await getPosts();
  const cors =
    process.env.NODE_ENV === "production" ? "https://michalhonc.cz" : "*";

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": cors,
    },
    body: JSON.stringify(posts),
  };
};
