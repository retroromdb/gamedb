const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = !!process.env.PORT ? process.env.PORT : 80;
const HOST = !!process.env.HOST ? process.env.HOST : undefined;
const API_SERVICE_URL = "https://downloads.retrostic.com/roms";

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use('/retrostic', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/retrostic`]: '',
    },
}));

if (!!HOST) {
    app.listen(PORT, HOST, () => {
        console.log(`Starting Proxy at ${HOST}:${PORT}`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`Starting Proxy at ${PORT}`);
    });
}

 