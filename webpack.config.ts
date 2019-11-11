import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const APP_PATH = path.resolve(__dirname, 'src')

const config: Configuration = {
  entry: APP_PATH,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, 'index.html')
    })
  ]
}
export default config
