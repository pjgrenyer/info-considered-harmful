import onFinished from 'on-finished';
import logger from '../lib/logger';

export default (req: any, res: any, next: any) => {
    logger.info('REQUEST', {
        meta: {
            req: {
                url: req.url,
                method: req.method,
                headers: req.headers,
                body: req.body,
                query: req.query,
                params: req.params,
            },
        },
    });

    function logRequest() {
        logger.info('RESPONSE', {
            meta: {
                req: {
                    url: req.url,
                    method: req.method,
                    headers: req.headers,
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                res: { statusCode: res.statusCode },
            },
        });
    }

    // log when response finished
    onFinished(res, logRequest);

    next();
};
