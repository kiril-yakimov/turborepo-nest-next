import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';

@Injectable()
export class DatabaseHealthCheckService {
    public constructor(
        private readonly orm: MikroORM,
        private readonly healthIndicatorService: HealthIndicatorService,
    ) {}

    public async isHealthy() {
        const indicator = this.healthIndicatorService.check('database');

        const isHealthy = await this.orm.isConnected();

        if (!isHealthy) {
            return indicator.down({ message: 'Database is not connected' });
        }

        return indicator.up({ message: 'Database is connected' });
    }
}
