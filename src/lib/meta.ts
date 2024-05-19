/* istanbul ignore next */
const packageJson =
    process.env.NODE_ENV == 'test' ? require('./../../package.json') : process.env.NODE_ENV == 'production' ? require('./../../package.json') : require('./../../package.json');

/* istanbul ignore next */
export const version = () => {
    return `${packageJson.version}`.trim();
};

/* istanbul ignore next */
export const name = () => {
    return `${packageJson.name}`.trim();
};
