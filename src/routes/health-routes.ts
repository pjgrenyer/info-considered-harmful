import { Router } from 'express';
import { healthController } from '../controllers/health-controller';

export const healthRoutes = () => {
    const router = Router();
    router.get('/', healthController);
    return router;
};
