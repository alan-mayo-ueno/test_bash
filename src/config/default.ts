import { Config } from "config";

export default {
  basePath: '$BASE_PATH/',
  basename: '$BASE_PATH',
  env: 'stg',
  api: {
    url: '/api',
    jwt: 'authorization',
    app: 'APP'
  }
} as Config
