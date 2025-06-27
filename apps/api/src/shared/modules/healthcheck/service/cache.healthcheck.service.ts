import { CACHE } from '@api/shared/modules/cache/types/config.type';
import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheHealthCheckService {
    public constructor(
        @Inject(CACHE) private readonly cacheManager: Cache,
        private readonly healthIndicatorService: HealthIndicatorService,
    ) {}

    public async isHealthy() {
        const indicator = this.healthIndicatorService.check('cache');

        try {
            await this.cacheManager.set('healthcheck', true);
            const isHealthy: boolean = await this.cacheManager.get('healthcheck');

            if (!isHealthy) {
                return indicator.down({
                    message: 'Cache is not healthy',
                });
            }

            return indicator.up({
                message: 'Cache is healthy',
            });
        } catch (error) {
            console.debug('Cache health check failed', error);

            return indicator.down({
                message: 'Cache is not healthy',
            });
        }
    }
}
