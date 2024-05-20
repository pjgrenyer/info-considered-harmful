import { object, number } from 'yup';

export const accountIdParamSchema = object({
    accountId: number().required(),
});

export const accountStatementQuerySchema = object({
    year: number().required().min(2020),
    month: number().required().max(12).min(1),
});
