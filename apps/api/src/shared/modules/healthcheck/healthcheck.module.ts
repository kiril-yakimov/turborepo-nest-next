import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppCacheModule } from '../cache/cache.module';
import { DatabaseModule } from '../database/database.module';
import { HealthCheckController } from './http/healthcheck.controller';
import { CacheHealthCheckService, DatabaseHealthCheckService } from './service';

@Module({
    imports: [AppCacheModule, DatabaseModule, TerminusModule],
    controllers: [HealthCheckController],
    providers: [DatabaseHealthCheckService, CacheHealthCheckService],
})
export class HealthCheckModule {}
