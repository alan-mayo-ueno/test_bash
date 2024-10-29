import path from 'path'
import { merge } from 'webpack-merge'
import Webpack from 'webpack'
import webpackConfig from './webpack.common'
import packageJson from './package.json'
import { configs } from './src/config/webpackconfig'

const env = process.env.APP_ENV || 'local'
const config = configs[env as keyof typeof configs]

const { ModuleFederationPlugin } = Webpack.container
const name = "$APP_TEMPLATE_KEY"// el namespace tiene que ser el mismo para todos para compartir dependencias
const filename = `remoteEntry.js`

const moduleFederationConfig = {
  name,
  filename,
  exposes: {
    './router': './src/exposes/routes.exposes.tsx',
  },
  shared: {
    ...packageJson.dependencies,
    react: {
      import: 'react',
      shareKey: 'react',
      shareScope: 'default',
      singleton: true,
      requiredVersion: packageJson.dependencies.react,
    },
    'react-dom': {
      import: 'react-dom',
      shareKey: 'react-dom',
      shareScope: 'default',
      singleton: true,
      requiredVersion: packageJson.dependencies['react-dom'],
    },
    'react-router-dom': {
      import: 'react-router-dom',
      shareKey: 'react-router-dom',
      shareScope: 'default',
      singleton: true,
      requiredVersion: packageJson.dependencies['react-router-dom'],
    },
    '@emotion/react': {
      import: '@emotion/react',
      shareKey: '@emotion/react',
      shareScope: 'default',
      singleton: true,
      requiredVersion: packageJson.dependencies['@emotion/react'],
    },
    '@ueno-tecnologia-org/ueno-bo-shared': {
      import: '@ueno-tecnologia-org/ueno-bo-shared',
      shareKey: '@ueno-tecnologia-org/ueno-bo-shared',
      shareScope: 'default',
      singleton: true,
      requiredVersion:
        packageJson.dependencies['@ueno-tecnologia-org/ueno-bo-shared'],
    },
  },
}

const moduleFederationPlugin = new ModuleFederationPlugin(
  moduleFederationConfig
)

const projectConfig: ReturnType<typeof merge> = {
  plugins: [moduleFederationPlugin],
  output: {
    publicPath: config.basePath, 
  },
  entry: {
    main: path.join(process.cwd(), '/src/index.tsx'),
  },
}

export default merge(webpackConfig, projectConfig)
