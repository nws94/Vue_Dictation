module.exports = {
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:3003/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}