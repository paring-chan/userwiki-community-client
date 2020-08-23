import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req, res) => (
    httpProxyMiddleware(req, res, {
        target: 'http://home.minibox.pw',
    })
);
