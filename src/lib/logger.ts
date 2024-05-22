import { AsyncLocalStorage } from 'async_hooks';

import { Level, Logger, processors, transports } from 'tripitaka';
const { context, timestamp, json, human, augment } = processors;
const { stream } = transports;

const { LOG_LEVEL } = process.env;
/* istanbul ignore next */
const logLevel = LOG_LEVEL ? Level.lookup(LOG_LEVEL?.toUpperCase() as string) : Level.DEBUG;

export const als = new AsyncLocalStorage<Map<string, any>>();

const localStorage = augment({
    source: () => {
        const store = als.getStore();

        /* istanbul ignore next */
        if (store) {
            return Object.fromEntries(store);
        }
    },
});

const logger = new Logger({
    level: logLevel,
    processors: [
        localStorage,
        context(),
        timestamp(),
        /* istanbul ignore next */
        process.env.NODE_ENV === 'production' ? json() : human(),
    ],
    transports: [stream({ threshold: logLevel })],
});

export default logger;
