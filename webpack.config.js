module.exports = {
  entry: './client', // assumes your entry point is the index.js in the root of your project folder
  mode: 'development',
  output: {
    path: __dirname + '/client/public', 
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  
}