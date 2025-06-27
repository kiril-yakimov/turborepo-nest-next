import { LOGGER } from '@api/shared/modules/logger/constants';
import { GlobalValidationPipe } from '@api/shared/pipes';
import {
    HttpStatus,
    ShutdownSignal,
    UnprocessableEntityException,
    VersioningType,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer, ValidationError } from 'class-validator';
import { AppHttpExceptionFilter } from './app-http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    const logger = app.get(LOGGER);
    app.useLogger(logger);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AppHttpExceptionFilter(logger, httpAdapter));

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    app.useGlobalPipes(
        new GlobalValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            stopAtFirstError: true,
            validationError: { target: false, value: false },
            exceptionFactory: (errors) => {
                // Helper function to recursively handle nested errors
                const flattenValidationErrors = (validationErrors: ValidationError[]) => {
                    return validationErrors.reduce((acc, error) => {
                        if (error.constraints) {
                            acc[error.property] =
                                error.constraints[Object.keys(error.constraints)[0]];
                        }

                        if (error.children && error.children.length > 0) {
                            // Recursively process child errors and nest them under the parent
                            const childErrors = flattenValidationErrors(error.children);

                            // Ensure the parent property is an object to hold nested errors
                            acc[error.property] = {
                                ...acc[error.property],
                                ...childErrors,
                            };
                        }

                        return acc;
                    }, {} as object);
                };

                return new UnprocessableEntityException({
                    errors: flattenValidationErrors(errors),
                    error: 'Unprocessable Entity',
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                });
            },
        }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // createSwaggerConfig(app);
    //
    // const config = app.get(ConfigService);
    // app.useWebSocketAdapter(
    //   createRedisAdaptorInstance(app, config.get<RedisConfigInterface>('redis'))
    // );

    app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

    try {
        const port = process.env.PORT || 3333;

        await app.init();
        await app.listen(port, () => {
            logger.log('Listening at http://localhost:' + port + '/');
        });
    } catch (e) {
        logger.error(`Error ${e}. Stack: ${e.stack}`);
    }
}
bootstrap();
