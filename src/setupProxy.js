const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/users",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            // pathRewrite: {'^/users': ''},
            onProxyRes: (proxyRes, req, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
                res.setHeader('Access-Control-Allow-Credentials', "true")
            }
        }),
        createProxyMiddleware("/restaurants",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            // pathRewrite: {'^/restaurants': ''},
            onProxyRes: (proxyRes, req, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
            }
        }),
        createProxyMiddleware("/contacts",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            // pathRewrite: {'^/contacts': ''},
            onProxyRes: (proxyRes, req, res) => {
                res.setHeader('Access-Control-Allow-Origin', '*')
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST,GET')
            }
        }),
        createProxyMiddleware("/composite",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            // pathRewrite: {'^/composite': ''},
        })
    )
};