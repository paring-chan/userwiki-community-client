import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req, res) => (
    httpProxyMiddleware(req, res, {
        target: 'https://userwiki.xyz',
    })
);
