export const entry = './src/index.tsx'
export const isProd = !!process.env.APP_ENV && process.env.APP_ENV !== 'local'
export const scriptRegexp = /\.(t|j)sx?$/
export const appNameExport = '$APP_TEMPLATE'
