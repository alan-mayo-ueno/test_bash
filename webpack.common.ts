/* eslint-disable @typescript-eslint/no-var-requires */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import postcssNormalize from 'postcss-normalize';
import dotenv from 'dotenv';
import merge from 'webpack-merge';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";

import type { JscConfig } from '@swc/core';
import { isProd, scriptRegexp } from './constants';

const jsc: JscConfig & Record<string, any> = {
  parser: {
    syntax: 'typescript',
    tsx: true,
  },
};

if (isProd) {
  jsc.minify = {
    compress: {
      unused: true,
    },
    // mangle: true,
  };
}

const htmlPlugin = new HtmlWebpackPlugin({
  templateContent: `
  <html>
    <head>
      <script>
        window.APP_ENV = ${!isProd ? "'local'" : "'REPLACE_APP_ENV'"}
      </script>
      <title>
        ${process.env.WINDOW_NAME || 'App'}
      </title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`,
});

const loaderMapper = (loader: string) => ({ loader });

const postcss = {
  // Options for PostCSS as we reference these options twice
  // Adds vendor prefixing based on your specified browser support in
  // package.json
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebook/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      // Adds PostCSS Normalize as the reset css with default options,
      // so that it honors browserslist config in package.json
      // which in turn let's users customize the target behavior as per their needs.
      postcssNormalize(),
    ],
    sourceMap: !isProd,
  },
};

const module = {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'].map(loaderMapper).concat([postcss]),
    },
    {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'].map(loaderMapper).concat([postcss]),
    },
    {
      test: scriptRegexp,
      loader: 'swc-loader',
      exclude: /node_modules/,
      options: {
        jsc,
        minify: isProd,
      },
    },
  ],
};

const envPlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify({
    ...dotenv.config({ path: `./.env` }).parsed,
  }),
});

const publicAssets = new CopyPlugin({
  patterns: [
    { from: "public", to: "public" },
  ],
})

const plugins = [
  publicAssets,
  htmlPlugin,
  envPlugin,
  process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin(),
].filter((plugin) => plugin);

let webpackConfig = {
  target: 'web',
  plugins,
  module,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.sass'],
    plugins: [new TsconfigPathsPlugin()],
  },
};

if (isProd) {
  const prodConfig: any = {
    mode: 'production',
    devtool: 'source-map',
  };

  webpackConfig = merge(webpackConfig, prodConfig);
} else {
  const devConfig: any = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      port: 3000,
      historyApiFallback: true,
      proxy: {
        '/bff/*': {
          target: 'http://localhost:3000',
          router: () => `https://internal.stg.ueno.it`,
          secure: false,
          changeOrigin: true,
          logLevel: 'debug',
          // Headers: { Cookie: 'u=eyJraWQiOiJ1Z1VRRWNQTHUzcHlMQlV3dGxqU2pFZmJRTnBMbUlQKzA0S1cxMlJBdnZrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3OTQ5MmIzOC1iODE3LTQzZjQtYTI5Zi0xYjUzYmM0NDcwZDgiLCJjb2duaXRvOmdyb3VwcyI6WyJiYWNrb2ZmaWNlIiwicGFibG86d3JpdGUiLCJiYWNrb2ZmaWNlOnJlYWQiLCJ1cy1lYXN0LTFfTDNCMTRxQ3BUX0dvb2dsZSIsInRyYXZlbGVyIiwiYmFja29mZmljZTp3cml0ZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MM0IxNHFDcFQiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzMmVzNTlwY2FlNjUyMTFmZjVoajJtN2lkaCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2OTIxMDQ4NTIsImV4cCI6MTY5MjE5MTI1MiwiaWF0IjoxNjkyMTA0ODUyLCJqdGkiOiIzZTZmN2Y3Ni00MTdiLTRlOWYtYTNlOS1jNjQ5Yzg4MzMwN2QiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMTY2OTY3NzQ3NTgyNzQ2MTE1MDgifQ.ifSUBtHPuZ8DGkiYEEU5e02JIPe16Nhd1bpHVCvaHlC-HpFzvUpKoM3ZquIvVe3COnyLVu6If-RiDV59y27lPPS8IiVgTUD98RaJ9X-DkSBMBW4De_Y8dMdWeTlG58cqWNGQ54zRu9MdIUozVZrH2nfP0scDPyWMIteeZmI5OhzJYMeF-tPdIm0V09FLL2sW2fSMFBe4qM6zNv3rGr6czAxjRu1BxWBRggKoNQH6Exa3IP9ifBwAJ0Wjyj7tBx9TnrbUA1CdUDqiNWIZ7rMhk4uzWymrSvOEha4e2ORh8G4PqWnrsFc11y7TPxxiH2jiF_9-XWW_emSMXM9km51Fzg'}
        },
      },
    },
  };

  webpackConfig = merge(webpackConfig, devConfig);
}

export default webpackConfig;
