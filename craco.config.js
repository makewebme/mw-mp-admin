module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        ignoreWarnings: [/Failed to parse source map/],
      }
    },
  },
}
