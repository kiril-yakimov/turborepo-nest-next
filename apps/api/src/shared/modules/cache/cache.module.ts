import { REDIS_CONFIG_KEY, RedisConfig } from '@api/config';
import { createKeyv } from '@keyv/redis';
import { CACHE_MANAGER, CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CACHE } from './types/config.type';

const providers: Provider[] = [
    {
        provide: CACHE,
        inject: [CACHE_MANAGER],
        useFactory: (manager) => manager,
    },
];

@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: async (config: ConfigService): Promise<CacheModuleOptions> => {
                const { redisDsn, redisNamespace, redisKeyPrefix, redisTtl } =
                    config.get<RedisConfig>(REDIS_CONFIG_KEY);

                const keyv = createKeyv(redisDsn, {
                    namespace: redisNamespace,
                    keyPrefixSeparator: redisKeyPrefix,
                });

                // Test redis connection
                try {
                    await keyv.set('test_connection', 'success', 1000); // Store test data
                    const testValue = await keyv.get('test_connection');
                    console.log('Keyv connection test:', testValue);
                } catch (error) {
                    console.error('Keyv connection failed:', error);
                }

                return {
                    ttl: redisTtl || 600000,
                    stores: [keyv],
                };
            },
        }),
    ],
    providers: [...providers],
    exports: [...providers],
})
export class AppCacheModule {}
