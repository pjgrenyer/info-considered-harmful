import dotenv from 'dotenv';
import { AsyncLocalStorage } from 'async_hooks';
import { Level, Logger, processors, transports } from 'tripitaka';
import { datadogTransport } from 'tripitaka-datadog';
import { datadogProcessor } from 'tripitaka-datadog';

const { context, timestamp, augment } = processors;
const { stream } = transports;

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

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
    processors: [localStorage, context(), timestamp(), datadogProcessor()],
    transports: [
        datadogTransport({
            apiKey: `${process.env.DATADOG_API_KEY}`,
            hostname: 'localhost',
            service: 'info-considered-harmful',
            ddsource: 'Paul Grenyer',
            ddtags: 'info-considered-harmful',
            intakeRegion: 'eu',
            threshold: Level.DEBUG,
        }),
        stream({ threshold: logLevel }),
    ],
});

export default logger;
