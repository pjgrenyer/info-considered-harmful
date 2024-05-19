import request from 'supertest';
import { initApp } from '../src/app';

describe('health', () => {
    const app = initApp();

    it('should be successfult', async () => {
        const { status } = await request(app).get('/_health').send();
        expect(status).toBe(200);
    });
});
