module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false
};
