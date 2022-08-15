const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 63000;
const HOST = "localhost";
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

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });
 