const path = require('path');

module.exports = {
  devServer: {
      port: 3000,
      open: true,
      proxy: {
        "/api": "http://localhost:8000"
      }
  },
	webpack: {
		resolve: {
         alias: {
            "@app": path.resolve(__dirname, "src/client/"),
         }
      }
  }
};
