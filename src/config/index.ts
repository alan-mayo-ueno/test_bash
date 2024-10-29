/**
 *
 * This configuration file contains what is related
 * to environment variables. For that it is necessary
 * to have the corresponding .env.xxxx files (Ex: .env.development, etc)
 *
 */

/* eslint-disable global-require */
import defaultConfig from './default'
export type ENVs = "dev" | "stg" | "prd" | "local"
export interface Config {
  basePath: string
  basename: string
  env: ENVs
  api: {
    url: string
  }
}

declare global {
  interface Window {
    APP_ENV: string;
  }
}

let config = { ...defaultConfig }

if (window.APP_ENV === 'stg') {
  config = { ...config, ...require('./stg').default }
}

if (window.APP_ENV === 'prd') {
  config = { ...config, ...require('./prd').default }
}

if (window.APP_ENV === 'local') {
  config = { ...config, ...require('./local').default }
}

if (window.APP_ENV === 'dev') {
  config = { ...config, ...require('./dev').default }
}

export default config
