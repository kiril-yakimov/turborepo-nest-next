import { DATABASE_CONFIG_KEY } from '@api/config';
import mikroConfig from './mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigInterface } from './types';

@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            providers: [],
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService): any => {
                const dbConfig: DatabaseConfigInterface =
                    config.get<DatabaseConfigInterface>(DATABASE_CONFIG_KEY);
                console.log('Database Config:', dbConfig);
                console.log('mikroConfig:', mikroConfig);
                console.log(' process.env:', process.env);

                return {
                    ...mikroConfig, // Spread the base config
                    host: dbConfig.host || mikroConfig.host,
                    dbName: dbConfig.dbName || mikroConfig.dbName,
                    user: dbConfig.user || mikroConfig.user,
                    password: dbConfig.password || mikroConfig.password,
                    port: dbConfig.port || mikroConfig.port,
                    charset: dbConfig.charset || mikroConfig.charset,
                    collate: dbConfig.collate || mikroConfig.collate,
                    // resultCache: {
                    //     adapter: RedisCacheAdapter,
                    //     options: {
                    //         dsn,
                    //     },
                    // },
                };
            },
        }),
    ],
})
export class DatabaseModule {}
