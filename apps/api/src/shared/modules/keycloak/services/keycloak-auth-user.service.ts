import { KEYCLOAK_CONFIG_KEY, KeycloakConfig } from '@api/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { LoginDto, TokenRoDto } from '../dtos';

@Injectable()
export class KeycloakAuthUserService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * Authenticate client
     *
     * @private
     */
    public async directGrantFlow(loginDto: LoginDto): Promise<TokenRoDto | null> {
        const { authUrl, realm, clientId, clientSecret } = this.getConfigData();

        const response = await this.httpService.axiosRef.post(
            `${authUrl}/realms/${realm}/protocol/openid-connect/token`,
            new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'password',
                scope: 'openid',
                username: loginDto.email,
                password: loginDto.password,
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        if (!response.data) {
            return null;
        }

        return plainToInstance(TokenRoDto, response.data);
    }

    public async refreshTokenExchange(refreshToken: string): Promise<TokenRoDto | null> {
        const { authUrl, realm, clientId, clientSecret } = this.getConfigData();

        const response = await this.httpService.axiosRef.post(
            `${authUrl}/realms/${realm}/protocol/openid-connect/token`,
            new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        if (!response.data) {
            return null;
        }

        return plainToInstance(TokenRoDto, response.data);
    }

    /**
     *  Extract config data
     *
     * @private
     */
    private getConfigData(): KeycloakConfig {
        return this.configService.get<KeycloakConfig>(KEYCLOAK_CONFIG_KEY);
    }
}
