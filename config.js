const config = {
  express: {
    port: process.env.PORT || 8888,
  },
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/NSIL',
  }
}

module.exports = {
  config
}