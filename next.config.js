const withSass = require("@zeit/next-sass");
module.exports = withSass({
  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/about",
        permanent: true,
      },
    ];
  },

  sassLoaderOptions: {
    sourceMap: true,
  },

  webpack: function (config, { isServer }) {
    // Fixes npm packages that depend on `fs` module
    // if (!isServer) {
    //   config.node = {
    //     fs: "empty",
    //   };
    // }
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
});
