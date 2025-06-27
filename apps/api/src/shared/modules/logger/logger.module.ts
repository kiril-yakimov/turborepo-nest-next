import { LOGGER_CONFIG_KEY, LoggerConfig } from '@api/config';
import { FactoryProvider, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { utilities, WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { LOGGER } from './constants';

const sharedProviders: FactoryProvider[] = [
    {
        provide: LOGGER,
        useFactory: (logger) => logger,
        inject: [WINSTON_MODULE_NEST_PROVIDER],
    },
];

@Global()
@Module({
    imports: [
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const loggerConfig = config.get<LoggerConfig>(LOGGER_CONFIG_KEY);
                const { level } = loggerConfig;

                return {
                    level,
                    transports: [
                        new winston.transports.Console({
                            format: winston.format.combine(
                                winston.format.timestamp(),
                                utilities.format.nestLike('Doc'),
                            ),
                            level: 'debug',
                        }),
                        new winston.transports.DailyRotateFile({
                            ...loggerConfig,
                            format: winston.format.combine(
                                winston.format.timestamp(),
                                winston.format.logstash(),
                            ),
                            filename: 'errors-%DATE%.json',
                            level: 'error',
                        }),
                        new winston.transports.DailyRotateFile({
                            ...loggerConfig,
                            format: winston.format.combine(
                                winston.format.timestamp(),
                                winston.format.logstash(),
                            ),
                            filename: 'app-%DATE%.json',
                        }),
                    ],
                };
            },
        }),
    ],
    providers: [...sharedProviders],
    exports: [...sharedProviders],
})
export class LoggerModule {}
