import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { HealthCheckService } from '@nestjs/terminus';
import { Public } from 'nest-keycloak-connect';
import { CacheHealthCheckService, DatabaseHealthCheckService } from '../service';

@Public()
@ApiExcludeController()
@Controller({
    path: '/healthcheck',
    version: VERSION_NEUTRAL,
})
export class HealthCheckController {
    public constructor(
        private readonly health: HealthCheckService,
        private readonly database: DatabaseHealthCheckService,
        private readonly cache: CacheHealthCheckService,
    ) {}

    @Get()
    public ping() {
        return this.health.check([
            async () => this.database.isHealthy(),
            async () => this.cache.isHealthy(),
        ]);
    }

    @Get('/test')
    public test() {
        return 'Working';
    }
}
