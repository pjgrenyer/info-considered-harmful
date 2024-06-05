import axios from 'axios';
import { DateTime } from 'luxon';
import logger from '../lib/logger';

const { BANK_API_KEY, BANK_URL } = process.env;

export const authenticate = async (): Promise<{ accessToken: string } | null> => {
    try {
        const url = `${BANK_URL}/authenticate`;
        logger.info(`Bank Authenticate URL: ${url}`);

        const response = await axios.get(url, {
            headers: {
                'x-api-key': BANK_API_KEY,
            },
        });

        logger.info(response.data);
        return {
            accessToken: response.data.accessToken,
        };
    } catch (error: unknown) {
        logger.error(`${error}`);
        return null;
    }
};

const bearerToken = (accessToken: string) => `Bearer ${accessToken}`;

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

        const response = await axios.get(url, {
            headers: {
                Authorization: bearerToken(accessToken),
            },
        });

        logger.info(response.data);
        return {
            fullname: response.data.fullname,
            addressLine1: response.data.addressLine1,
            addressLine2: response.data.addressLine2,
            town: response.data.town,
            postcode: response.data.postcode,
            accountNumber: response.data.accountNumber,
            sortCode: response.data.sortCode,
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

        const response = await axios.get(url, {
            headers: {
                Authorization: bearerToken(accessToken),
            },
        });

        logger.info(response.data);
        return response.data.map((transaction: { date: string; description: string; amount: number; pending: boolean }) => ({
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

        const response = await axios.get(url, {
            headers: {
                Authorization: bearerToken(accessToken),
            },
        });

        logger.info(response.data);
        return {
            cleared: response.data.cleared,
            pending: response.data.pending,
        };
    } catch (error: unknown) {
        logger.error(`${error}`);
        throw error;
    }
};
