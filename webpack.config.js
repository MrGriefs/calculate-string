module.exports = {
    mode: "production",
    entry: './index.js',
    target: ["web", "es5"],
    output: {
      filename: 'index.min.js',
      path: __dirname,
      library: {
        type: 'var',
        name: 'calculateString'
      }
    },
  };