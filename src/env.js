const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  },
  stage: {
    isProduction: true
  }
}[process.env.LEANCLOUD_APP_ENV || process.env.NODE_ENV || 'development'];


module.exports = environment