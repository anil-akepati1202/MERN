const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
// app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/user", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
