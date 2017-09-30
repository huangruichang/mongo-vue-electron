module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './src/renderer/index.js'
    return config
  }
}
