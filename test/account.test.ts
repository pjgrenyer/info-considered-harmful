import request from 'supertest';
import { initApp } from '../src/app';

describe('account', () => {
    const validAccountId = '12345678';
    const invalidAccountId = 'AB123456';
    const app = initApp();

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
