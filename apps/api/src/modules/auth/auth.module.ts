import { UserModule } from '@api/modules/user/user.module';
import { KeycloakModule } from '@api/shared/modules/keycloak/keycloak.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
    AppleController,
    GoogleController,
    LoginController,
    RefreshController,
    RegisterController,
} from './http';

@Module({
    imports: [CqrsModule, UserModule, KeycloakModule],
    controllers: [
        AppleController,
        GoogleController,
        LoginController,
        RefreshController,
        RegisterController,
    ],
    providers: [],
})
export class AuthModule {}
