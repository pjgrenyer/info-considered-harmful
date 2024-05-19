import { Router } from 'express';
import { accountSummary } from '../controllers/account-controller';
import { paramsSchemaValidator } from '../middleware/params-schema-validator';
import { accountSummarySchema } from '../controllers/schemas/account-schemas';

export const accountRoutes = () => {
    const router = Router();
    router.get('/:accountId/summary', paramsSchemaValidator(accountSummarySchema), accountSummary);
    return router;
};
