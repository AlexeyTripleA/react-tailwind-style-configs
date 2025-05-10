module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.p?css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true } },
          'postcss-loader'
        ],
      },
      {
        test: /\.p?css$/i,
        exclude: /\.module\.p?css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ]
  }
  // ... other settings
}
