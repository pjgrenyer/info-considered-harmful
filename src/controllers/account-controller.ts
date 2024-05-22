import { Request, Response } from 'express';
import { accountDetails, authenticate } from '../services/bank-service';
import logger from '../lib/logger';
import { formatAccountNumber, formatSortCode } from '../lib/formatter';

export const accountStatement = async (req: Request, res: Response) => {
    const accountId = +req.params.accountId;

    const auth = await authenticate();
    if (!auth) {
        logger.error('unable to get accessToken');
        return res.status(500).send({});
    }

    const { accessToken } = auth;

    const details = await accountDetails(accessToken, accountId);

    return res.status(200).send({
        details: { ...details, accountNumber: formatAccountNumber(details.accountNumber), sortCode: formatSortCode(details.sortCode) },
    });
};

export const accountSummary = (req: Request, res: Response) => {
    return res.status(200).send({});
};
