import { Configuration } from 'webpack'
import path from 'path'

const APP_PATH = path.resolve(__dirname, 'src')

const config: Configuration = {
  entry: APP_PATH,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, './src/')
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }]
      }
    ]
  }
}
export default config
