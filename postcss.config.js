module.exports = {
  plugins: {
    autoprefixer: {
      browsers: [
        "last 10 versions",
        "ie >= 6",
        "ie_mob >= 6",
        "ff >= 10",
        "chrome >= 14",
        "safari >= 3",
        "ios >= 4",
        "android >= 4.0"
      ]
    },
    'postcss-pxtorem': {
      rootValue: 34,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 5
    }
  }
};
