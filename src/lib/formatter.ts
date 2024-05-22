import logger from './logger';

export const formatAccountNumber = (accountNumber: string): string => {
    logger.info(`Formatting account number: ${accountNumber}`);
    while (accountNumber.length < 8) {
        accountNumber = `0${accountNumber}`;
    }
    logger.info(`Formatted account number: ${accountNumber}`);
    return accountNumber;
};

export const formatSortCode = (sortCode: string): string => {
    logger.info(`Formatting sort code: ${sortCode}`);
    const forammtedSortCode = `${sortCode.substring(0, 2)}-${sortCode.substring(2, 4)}-${sortCode.substring(4, 6)}`;
    logger.info(`Formatting sort code: ${forammtedSortCode}`);
    return forammtedSortCode;
};
