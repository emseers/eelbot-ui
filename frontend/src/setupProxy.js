const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/api/',
        createProxyMiddleware({
            target: process.env.HTTP_PROXY || 'http://127.0.0.1:1337',
            changeOrigin: true,
            pathRewrite: {
                '^/api/': '/',
            },
        })
    );
};


