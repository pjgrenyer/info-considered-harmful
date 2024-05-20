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
