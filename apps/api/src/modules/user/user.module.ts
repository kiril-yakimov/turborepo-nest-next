import { KeycloakModule } from '@api/shared/modules/keycloak/keycloak.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { createMikroOrmRepositoryProviders } from '@mikro-orm/nestjs/mikro-orm.providers';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCreateHandler, UserDeleteHandler } from './commands';
import { User } from './entites/user.entity';
import { UserAdminController } from './http/user-admin.controller';
import { GetUserHandler } from './queries';

const sharedProviders: Provider[] = [UserCreateHandler, UserDeleteHandler, GetUserHandler];

@Module({
    imports: [
        CqrsModule,
        KeycloakModule,
        MikroOrmModule.forFeature({
            entities: [User],
        }),
    ],
    controllers: [UserAdminController],
    providers: [...createMikroOrmRepositoryProviders([User]), ...sharedProviders],
    exports: [...sharedProviders],
})
export class UserModule {}
