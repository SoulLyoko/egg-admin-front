const publicPath = process.env.VUE_APP_BASE_URL || "/";

module.exports = {
  publicPath,
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false
};
