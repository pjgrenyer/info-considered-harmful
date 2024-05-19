import express, { Request, Response } from 'express';
import logger, { als } from './lib/logger';
import { version, name } from './lib/meta';
const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    als.run(new Map(), () => {
        als.getStore()?.set('version', version());
        als.getStore()?.set('name', name());

        logger.info(`Started ${name()} on port ${PORT}`, {
            context: 'listen',
            port: PORT,
        });
    });
});
