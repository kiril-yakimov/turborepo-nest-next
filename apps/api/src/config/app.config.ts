export const APP_CONFIG_KEY = 'app';
export type AppConfig = {
    name: string;
    environment: string;
    encryptionKey: string;
};

export const app = (): {
    [APP_CONFIG_KEY]: Partial<AppConfig>;
} => ({
    [APP_CONFIG_KEY]: {
        name: process.env.APP_NAME,
        environment: process.env.ENVIRONMENT,
        encryptionKey: process.env.ENCRYPTION_KEY,
    },
});
