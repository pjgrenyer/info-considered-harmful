import { Request, Response } from 'express';
import logger from '../lib/logger';

export const healthController = (_req: Request, res: Response) => {
    logger.info('Service healthy!', {
        context: 'Route: _health',
    });
    return res.status(200).send();
};
