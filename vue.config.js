module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8000/auth',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': ''
        }
      },
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  }
};