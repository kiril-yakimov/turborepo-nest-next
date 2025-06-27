export const LOGGER_CONFIG_KEY = 'logger';

export type LoggerConfig = {
    level: string;
    maxSize: string;
    maxFiles: number;
    dirname: string;
};

export const logger = (): {
    [LOGGER_CONFIG_KEY]: LoggerConfig;
} => ({
    [LOGGER_CONFIG_KEY]: {
        level: process.env.LOGGER_LEVEL,
        maxSize: process.env.LOGGER_FILE_MAX_SIZE,
        maxFiles: Number(process.env.LOGGER_MAX_FILES),
        dirname: process.env.LOGGER_OUTPUT_DIRECTORY,
    },
});
