import express from 'express';
import logger, { als } from './lib/logger';
import { version, name } from './lib/meta';
import { healthRoutes } from './routes/health-routes';
import loggerMiddleware from './middleware/logger';
import { accountRoutes } from './routes/account-routes';

/* istanbul ignore next */
const PORT = process.env.PORT ? +process.env.PORT : 3000;

export const initApp = () => {
    const app = express();

    app.use(loggerMiddleware);
    app.use('/_health', healthRoutes());
    app.use('/account', accountRoutes());

    return app;
};

/* istanbul ignore next */
export const startApp = () =>
    als.run(new Map(), () =>
        initApp().listen(PORT, () => {
            als.getStore()?.set('version', version());
            als.getStore()?.set('name', name());

            logger.info(`Started ${name()} on port ${PORT}`, {
                context: 'listen',
                port: PORT,
            });
        })
    );
