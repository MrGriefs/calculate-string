module.exports = {
    mode: "production",
    entry: './index.js',
    target: "web",
    output: {
      filename: 'index.min.js',
      path: __dirname,
      library: {
        type: 'var',
        name: 'calculateString'
      }
    },
  };