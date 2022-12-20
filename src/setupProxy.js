const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/users",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            pathRewrite: {'^/users': ''},
        }),
        createProxyMiddleware("/restaurants",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            pathRewrite: {'^/restaurants': ''},
        }),
        createProxyMiddleware("/contacts",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            pathRewrite: {'^/contacts': ''},
        }),
        createProxyMiddleware("/composite",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            pathRewrite: {'^/composite': ''},
        }),
        createProxyMiddleware("/reviews",{
            target: "https://93dqximkq0.execute-api.us-east-1.amazonaws.com",
            changeOrigin: true,
            pathRewrite: {'^/reviews': ''},
        }),
    )
};