/* eslint no-console: 0 */
import httpProxy from 'http-proxy';

export default (app) => {
  const apiProxy = httpProxy.createProxyServer();

  // Proxy api requests
  app.use('/calculator/quicktrade-quote', (req, res) => {
    req.url = req.originalUrl;
    apiProxy.web(req, res, {
      target: 'https://app.currencyfair.com',
      changeOrigin: true,
    });

    apiProxy.on('error', (error) => {
      console.log(`Proxy error: ${error}`);
    });
  });
  return app;
};
