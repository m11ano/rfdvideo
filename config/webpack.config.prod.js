const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

const path = require('path');

let mode = 'development';
if (process.env.NODE_ENV === 'production')
{
  mode = 'production';
}

console.log(mode);

module.exports = {
  mode: mode,
  devServer: (mode == 'production' ? undefined : {
    static: {
      directory: path.join(__dirname, '../files'),
      publicPath: '/files',
    },
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    allowedHosts: 'all',
  }),
  entry: {
    main: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    clean: true, 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify : false,
      inject : 'body'
    }),
    /*
    new CopyPlugin({
      patterns: [
        { from: "source", to: "dest" },
      ],
    }),
    */
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
  optimization: {
    minimize : true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      },
      { 
        test: /\.(png|svg|jpg|jpeg|gif|woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
            filename: './resource/[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
    alias: {
      '@': path.join(__dirname, '../src/'),
    },
  },
};

