import config from '@api/config';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppCacheModule } from './modules/cache/cache.module';
import { DatabaseModule } from './modules/database/database.module';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { LoggerModule } from './modules/logger/logger.module';
import { QueueModule } from './modules/queue/queue.module';
import { GlobalValidationPipe } from './pipes';

const sharedProviders: Provider[] = [GlobalValidationPipe];

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: config,
        }),
        DatabaseModule,
        AppCacheModule,
        HealthCheckModule,
        KeycloakModule,
        LoggerModule,
        QueueModule,
    ],
    providers: [...sharedProviders],
    exports: [...sharedProviders],
})
export class SharedModule {}
