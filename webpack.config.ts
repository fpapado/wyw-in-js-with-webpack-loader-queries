import type { Configuration } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import * as path from 'node:path';
import { Config } from '@swc/core';
import { WYWinJSDebugPlugin } from '@wyw-in-js/webpack-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const DEV = process.env.NODE_ENV !== 'production';

const swcOptions: Config = {
  jsc: {
    transform: {
      react: {
        runtime: 'automatic',
      },
    },
  },
};

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  context: __dirname,
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new WYWinJSDebugPlugin({
      dir: 'wyw-in-js-debug',
      print: true,
    }),
  ],
  module: {
    rules: [
      {
        // Match assets such as `arrow.svg?svgUse`, making them compatible with `svg >
        // use[href]`. Emit a transformed SVG asset, and return a JS module
        // with all the relevant information.
        test: /\.svg$/i,
        resourceQuery: {
          and: [/svgUse/i, { not: [/noTheme/i] }],
        },
        // This loader chain ultimately returns JS code, and emits an asset
        type: 'javascript/auto',
        use: [
          {
            loader: '@svg-use/webpack',
            options: {
              // Customise to your heart's content
              svgAssetFilename: 'svgAssets/[name]-[contenthash].[ext]',
            },
          },
        ],
      },
      {
        // Assets without a theme, such as country flags.
        // Referenced as `icon.svg?svgUse&noTheme`
        test: /\.svg$/i,
        resourceQuery: {
          and: [/svgUse/i, /noTheme/i],
        },
        type: 'javascript/auto',
        use: [
          {
            loader: '@svg-use/webpack',
            options: {
              getThemeSubstitutions: null,
              svgAssetFilename: 'svgAssets/[name]-[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: [
          { loader: 'swc-loader', options: swcOptions },
          {
            loader: '@wyw-in-js/webpack-loader',
            options: {
              displayName: true,
              sourceMap: false,
              babelOptions: {
                presets: ['@babel/preset-typescript'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: DEV ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
};

export default config;
