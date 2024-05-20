import { Request, Response } from 'express';
import { authenticate } from '../services/bank-service';
import logger from '../lib/logger';

export const accountStatement = async (req: Request, res: Response) => {
    const accountId = req.params.accountId;

    const auth = await authenticate();
    if (!auth) {
        logger.error('unable to get accessToken');
        return res.status(500).send({});
    }

    return res.status(200).send({});
};

export const accountSummary = (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    return res.status(200).send({});
};
