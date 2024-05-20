import request from 'supertest';
import { initApp } from '../src/app';
import nock from 'nock';
import { v4 } from 'uuid';

const BANK_URL = process.env.BANK_URL ?? '';
const BANK_API_KEY = process.env.BANK_API_KEY ?? '';
const accessToken = v4();

describe('account', () => {
    const validAccountId = '12345678';
    const invalidAccountId = 'AB123456';
    const app = initApp();

    afterEach(() => {
        nock.restore();
    });

    describe('statement', () => {
        it('should GET account statement', async () => {
            nock(BANK_URL).get('/authenticate').matchHeader('x-api-key', BANK_API_KEY).reply(200, { accessToken });

            const { status } = await request(app).get(`/account/${validAccountId}/statement?year=2024&month=5`).send();
            expect(status).toBe(200);
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
    });

    describe('summary', () => {
        it('should GET account summary', async () => {
            const { status } = await request(app).get(`/account/${validAccountId}/summary`).send();
            expect(status).toBe(200);
        });

        it('should fail with invalid accountId', async () => {
            const { status } = await request(app).get(`/account/${invalidAccountId}/summary`).send();
            expect(status).toBe(400);
        });
    });
});
