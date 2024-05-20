import { Router } from 'express';
import { accountStatement, accountSummary } from '../controllers/account-controller';
import { paramsSchemaValidator, querySchemaValidator } from '../middleware/schema-validator';
import { accountIdParamSchema, accountStatementQuerySchema } from '../controllers/schemas/account-schemas';

export const accountRoutes = () => {
    const router = Router();
    router.get('/:accountId/summary', paramsSchemaValidator(accountIdParamSchema), accountStatement);
    router.get('/:accountId/statement', paramsSchemaValidator(accountIdParamSchema), querySchemaValidator(accountStatementQuerySchema), accountSummary);
    return router;
};
