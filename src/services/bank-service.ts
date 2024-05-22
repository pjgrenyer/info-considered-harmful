import axios from 'axios';
import logger from '../lib/logger';

const { BANK_API_KEY, BANK_URL } = process.env;

export const authenticate = async (): Promise<{ accessToken: string } | null> => {
    try {
        const url = `${BANK_URL}/authenticate`;
        logger.info(`Bank Authentiate URL: ${url}`);

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
