const axios = require("axios");

const igUrl =
  "https://www.instagram.com/graphql/query/?query_hash=9dcf6e1a98bc7f6e92953d5a61027b98&variables=%7B%22id%22%3A%2223309467120%22%2C%22first%22%3A6%7D";
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
    const { data } = await axios.get(igUrl);
    const posts = slimData(data);

    updateCache(posts);

    return posts;
  } catch {
    return [];
  }
}

function slimData(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge) => ({
    big: edge.node.thumbnail_src,
    small: edge.node.thumbnail_resources[2].src,
    url: `https://instagram.com/p/${edge.node.shortcode}`,
    caption: edge.node.edge_media_to_caption.edges[0].node.text,
    likes: edge.node.edge_media_preview_like.count,
    comments: edge.node.edge_media_to_comment.count,
    id: edge.node.id,
  }));
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
