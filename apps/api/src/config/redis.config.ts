export const REDIS_CONFIG_KEY = 'redis';

export type RedisConfig = {
    redisDsn: string;
    redisNamespace: string;
    redisKeyPrefix: string;
    redisTtl: number;
};

export const redis = (): {
    [REDIS_CONFIG_KEY]: RedisConfig;
} => ({
    [REDIS_CONFIG_KEY]: {
        redisDsn: process.env.REDIS_DSN,
        redisNamespace: process.env.REDIS_NAMESPACE,
        redisKeyPrefix: process.env.REDIS_KEY_PREFIX,
        redisTtl: parseInt(process.env.REDIS_TTL),
    },
});
