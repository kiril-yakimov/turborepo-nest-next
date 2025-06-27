import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfig, REDIS_CONFIG_KEY } from '@api/config';
import { QueueOptions } from 'bullmq';

@Module({
    imports: [
        BullModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: async (config: ConfigService): Promise<QueueOptions> => {
                const { redisDsn, redisNamespace } = config.get<RedisConfig>(REDIS_CONFIG_KEY);

                return {
                    prefix: redisNamespace,
                    connection: {
                        url: redisDsn,
                    },
                };
            },
        }),
    ],
})
export class QueueModule {}
