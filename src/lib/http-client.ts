import axios from 'axios';
import logger from './logger';

export const bearerToken = (accessToken: string) => `Bearer ${accessToken}`;

export const get = async (url: string, headers?: { Authorization?: string; 'x-api-key'?: string }) => {
    logger.info('REMOTE REQUEST', {
        url,
        headers,
    });
    const response = await axios.get(url, {
        headers,
    });

    logger.info('REMOTE RESPONSE', {
        status: response.status,
        statusText: response.statusText,
        body: response.data,
    });

    return {
        status: response.status,
        statusText: response.statusText,
        body: response.data,
    };
};
