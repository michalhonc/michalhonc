const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
});
