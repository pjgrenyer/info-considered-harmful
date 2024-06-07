import { DateTime } from 'luxon';
import logger from '../lib/logger';
import { bearerToken, get } from '../lib/http-client';

const { BANK_API_KEY, BANK_URL } = process.env;

export const authenticate = async (): Promise<{ accessToken: string } | null> => {
    try {
        const url = `${BANK_URL}/authenticate`;
        logger.info(`Bank Authenticate URL: ${url}`);

        const { body } = await get(url, {
            'x-api-key': BANK_API_KEY,
        });

        return {
            accessToken: body.accessToken,
        };
    } catch (error: unknown) {
        logger.error(`${error}`);
        return null;
    }
};

export const accountDetails = async (
    accessToken: string,
    accountId: number
): Promise<{
    fullname: string;
    addressLine1: string;
    addressLine2: string;
    town: string;
    postcode: string;
    accountNumber: string;
    sortCode: string;
}> => {
    try {
        const url = `${BANK_URL}/account/${accountId}/details`;
        logger.info(`Bank Account Details URL: ${url}`);

        const { body } = await get(url, {
            Authorization: bearerToken(accessToken),
        });

        return {
            fullname: body.fullname,
            addressLine1: body.addressLine1,
            addressLine2: body.addressLine2,
            town: body.town,
            postcode: body.postcode,
            accountNumber: body.accountNumber,
            sortCode: body.sortCode,
        };
    } catch (error: unknown) {
        logger.error(`${error}`);
        throw error;
    }
};

export const accountTransactions = async (
    accessToken: string,
    accountId: number
): Promise<
    {
        date: DateTime;
        description: string;
        amount: number;
        pending: boolean;
    }[]
> => {
    try {
        const url = `${BANK_URL}/account/${accountId}/transaction`;
        logger.info(`Bank Account Balance URL: ${url}`);

        const { body } = await get(url, {
            Authorization: bearerToken(accessToken),
        });

        return body.map((transaction: { date: string; description: string; amount: number; pending: boolean }) => ({
            date: DateTime.fromISO(transaction.date),
            description: transaction.description,
            amount: transaction.amount,
            pending: transaction.pending,
        }));
    } catch (error: unknown) {
        logger.error(`${error}`);
        throw error;
    }
};

export const accountBalances = async (accessToken: string, accountId: number): Promise<{ cleared: number; pending: number }> => {
    try {
        const url = `${BANK_URL}/account/${accountId}/balance`;
        logger.info(`Bank Account Balance URL: ${url}`);

        const { body } = await get(url, {
            Authorization: bearerToken(accessToken),
        });

        return {
            cleared: body.cleared,
            pending: body.pending,
        };
    } catch (error: unknown) {
        logger.error(`${error}`);
        throw error;
    }
};
