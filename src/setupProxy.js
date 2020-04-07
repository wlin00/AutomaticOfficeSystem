const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    //proxy配置，处理浏览器跨域问题
    app.use(createProxyMiddleware('/AutomaticOfficeSystem', {
        target: 'http://52.80.161.97:9616',
        changeOrigin: true,
    }));

    




}