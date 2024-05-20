import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import logger from '../lib/logger';

export const querySchemaValidator = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.query);
        return next();
    } catch (error: any) {
        logger.error(error.message, { context: 'querySchemaValidator', params: req.params, error });
        return res.status(400).send({ message: error.message });
    }
};

export const paramsSchemaValidator = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req.params);
        return next();
    } catch (error: any) {
        logger.error(error.message, { context: 'paramsSchemaValidator', params: req.params, error });
        return res.status(400).send({ message: error.message });
    }
};
