const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.[tj]s$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(?:mp3|wav|ogg|mp4)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
      alias: {
        '~': path.resolve(__dirname, './src/'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    devServer: {
      //browse to http://localhost:3000/ during development
      port: env.port,
      //enables HMR
      hot: true, // TODO
      //for react-router to work
      historyApiFallback: true,
      //console logs
      //open browser after server had been started
      open: true,
      proxy: [
        {
          context: ['/directus'],
          target: 'http://localhost:8055',
          pathRewrite: { '^/directus': '' },
          changeOrigin: true,
          secure: false,
          logLevel: "debug"
        },
      ],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    plugins: [
      //clean destination folder before new build
      //new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
      new HtmlWebpackPlugin({
        favicon: "./src/assets/svg/logo.svg",
        template: path.resolve(__dirname, './src/index.html'),
      }),
    ],
  };
}