import { Request, Response } from 'express';

export const accountStatement = (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    return res.status(200).send({});
};

export const accountSummary = (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    return res.status(200).send({});
};
