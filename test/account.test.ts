import request from 'supertest';
import { initApp } from '../src/app';
import nock from 'nock';
import { v4 } from 'uuid';

describe('account', () => {
    const BANK_URL = process.env.BANK_URL ?? '';
    const BANK_API_KEY = process.env.BANK_API_KEY ?? '';
    const validAccountId = '12345678';
    const accessToken = v4();
    const app = initApp();

    afterEach(() => {
        nock.restore();
    });

    describe('statement', () => {
        it('should GET account statement', async () => {
            nock(BANK_URL).get('/authenticate').matchHeader('x-api-key', BANK_API_KEY).reply(200, { accessToken });
            nock(BANK_URL).get(`/account/${validAccountId}/details`).matchHeader('Authorization', `Bearer ${accessToken}`).reply(200, {
                fullname: 'Eric T Bannana',
                addressLine1: '29 Acacia Road',
                addressLine2: 'The Orchards',
                town: 'London',
                postcode: 'AB1 2CD',
                accountNumber: '1234567',
                sortCode: '123456',
            });

            nock(BANK_URL).get(`/account/${validAccountId}/balance`).matchHeader('Authorization', `Bearer ${accessToken}`).reply(200, {
                cleared: 1000,
                pending: 345,
            });

            const { status, body } = await request(app).get(`/account/${validAccountId}/statement?year=2024&month=5`).send();
            expect(status).toBe(200);
            expect(body).toEqual({
                details: {
                    accountNumber: '01234567',
                    addressLine1: '29 Acacia Road',
                    addressLine2: 'The Orchards',
                    fullname: 'Eric T Bannana',
                    postcode: 'AB1 2CD',
                    sortCode: '12-34-56',
                    town: 'London',
                },
                balances: {
                    cleared: 1000,
                    pending: 345,
                },
            });
        });

        it('should fail with invalid accountId', async () => {
            const { status } = await request(app).get(`/account/${validAccountId}/statement`).send();
            expect(status).toBe(400);
        });

        it('should fail to authenticate with bank', async () => {
            nock(BANK_URL).get('/authenticate').reply(401, 'Invalid API Key');
            const { status } = await request(app).get(`/account/${validAccountId}/statement?year=2024&month=5`).send();
            expect(status).toBe(500);
        });

        it('should fail to get account details', async () => {
            nock(BANK_URL).get('/authenticate').matchHeader('x-api-key', BANK_API_KEY).reply(200, { accessToken });
            nock(BANK_URL).get(`/account/${validAccountId}/details`).matchHeader('Authorization', `Bearer ${accessToken}`).reply(500, { message: 'Unknown error!' });

            const { status } = await request(app).get(`/account/${validAccountId}/statement?year=2024&month=5`).send();
            expect(status).toBe(500);
        });
    });
});
