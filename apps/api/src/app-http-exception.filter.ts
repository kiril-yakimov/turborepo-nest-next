import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, HttpServer, Logger } from '@nestjs/common';

export class AppHttpExceptionFilter extends BaseExceptionFilter {
    public constructor(
        private readonly systemLogger: Logger,
        public readonly applicationRef?: HttpServer,
    ) {
        super(applicationRef);
    }

    public catch(exception: unknown, host: ArgumentsHost) {
        this.systemLogger.error(exception);

        super.catch(exception, host);
    }
}
