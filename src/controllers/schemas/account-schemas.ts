import { object, number } from 'yup';

export const accountSummarySchema = object({
    accountId: number().required(),
});
