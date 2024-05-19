/* istanbul ignore next */
const packageJson =
    process.env.NODE_ENV == 'test' ? require('./../../package.json') : process.env.NODE_ENV == 'production' ? require('./../../package.json') : require('./../../package.json');

const version = () => {
    return `${packageJson.version}`.trim();
};

const name = () => {
    return `${packageJson.name}`.trim();
};

const description = () => {
    return `${packageJson.description}`.trim();
};

export { version, name, description };
