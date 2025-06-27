import { KEYCLOAK_CONFIG_KEY, KeycloakConfig } from '@api/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { KeycloakUserInterface, KeycloakUserRoleInterface } from '../types';
import { KeycloakAdminAuthService } from './keycloak-admin-auth.service';

@Injectable()
export class KeycloakAdminUserService {
    constructor(
        private readonly configService: ConfigService,
        private readonly keycloakAdminAuthService: KeycloakAdminAuthService,
        private readonly httpService: HttpService,
    ) {}

    /**
     * Create user in keycloak
     *
     * @param userData
     */
    public async createUser(userData: KeycloakUserInterface): Promise<void> {
        const { authUrl, realm } = this.getConfigData();

        await firstValueFrom(
            this.httpService.post(`${authUrl}/admin/realms/${realm}/users`, userData, {
                headers: await this.generateHeaders(),
            }),
        );
    }

    /**
     * Update user in keycloak
     *
     * @param keycloakUserId
     * @param userUpdateData
     */
    public async updateUser(
        keycloakUserId: string,
        userUpdateData: KeycloakUserInterface,
    ): Promise<void> {
        const { authUrl, realm } = this.getConfigData();
        await firstValueFrom(
            this.httpService.put(
                `${authUrl}/admin/realms/${realm}/users/${keycloakUserId}`,
                userUpdateData,
                {
                    headers: await this.generateHeaders(),
                },
            ),
        );
    }

    /**
     * Delete user in keycloak
     *
     * @param keycloakUserId
     * @param userUpdateData
     */
    public async deleteUser(keycloakUserId: string): Promise<void> {
        const { authUrl, realm } = this.getConfigData();

        await firstValueFrom(
            this.httpService.delete(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}`, {
                headers: await this.generateHeaders(),
            }),
        );
    }

    public async getDeferredJWT(): Promise<string | null> {
        const { authUrl, realm } = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(
                `${authUrl}/realms/${realm}/authorisation-server/get-deferred-token`,
            ),
        );

        return response.data?.deferred_token ?? null;
    }

    /**
     *  Get user id by id
     *
     * @param keycloakUserId
     */
    public async getUserById(keycloakUserId: string): Promise<string | null> {
        const { authUrl, realm } = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/users/${keycloakUserId}`, {
                headers: await this.generateHeaders(),
            }),
        );

        return response.data;
    }

    /**
     * Get user id by  username
     *
     * @param username
     */
    public async getUserIdByUsername(username: string): Promise<string | null> {
        const { authUrl, realm } = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/users`, {
                params: {
                    username,
                },
                headers: await this.generateHeaders(),
            }),
        );

        return response.data[0].id ?? null;
    }

    /**
     *  Get user by email
     *
     * @param username
     */
    public async getUserIdByEmail(email: string): Promise<string | null> {
        const { authUrl, realm } = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/users`, {
                params: {
                    email,
                },
                headers: await this.generateHeaders(),
            }),
        );

        return response.data[0]?.id || null;
    }

    /**
     * Get user r available realm roles
     *
     * @param keycloakUserId
     */
    public async getUserAvailableRoles(
        keycloakUserId: string,
    ): Promise<KeycloakUserRoleInterface[]> {
        const { authUrl, realm } = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(
                `${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm/available`,
                {
                    headers: await this.generateHeaders(),
                },
            ),
        );

        return response.data;
    }

    public async getUserRealmRoles(keycloakUserId: string): Promise<KeycloakUserRoleInterface[]> {
        const { authUrl, realm } = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(
                `${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm`,
                {
                    headers: await this.generateHeaders(),
                },
            ),
        );

        return response.data;
    }

    public async assignRealmRoleToUser(
        keycloakUserId: string,
        realmRoleToAssign: KeycloakUserRoleInterface,
    ): Promise<void> {
        const { authUrl, realm } = this.getConfigData();

        await firstValueFrom(
            this.httpService.post(
                `${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm`,
                [realmRoleToAssign],
                {
                    headers: await this.generateHeaders(),
                },
            ),
        );
    }

    public async deleteRealmRoleToUser(
        keycloakUserId: string,
        roleToDelete: KeycloakUserRoleInterface,
    ): Promise<void> {
        const { authUrl, realm } = this.getConfigData();

        await firstValueFrom(
            this.httpService.delete(
                `${authUrl}/admin/realms/${realm}/users/${keycloakUserId}/role-mappings/realm`,
                {
                    data: [roleToDelete],
                    headers: await this.generateHeaders(),
                },
            ),
        );
    }

    /**
     * Get realm roles list
     */
    public async getAllRealmRoles(): Promise<KeycloakUserRoleInterface[]> {
        const { authUrl, realm } = this.getConfigData();

        const response = await firstValueFrom(
            this.httpService.get(`${authUrl}/admin/realms/${realm}/roles`, {
                headers: await this.generateHeaders(),
            }),
        );

        return response.data;
    }

    /**
     *  Extract config data
     *
     * @private
     */
    private getConfigData() {
        return this.configService.get<KeycloakConfig>(KEYCLOAK_CONFIG_KEY);
    }

    /**
     * Generate headers
     *
     * @private
     */
    private async generateHeaders() {
        const token = await this.keycloakAdminAuthService.getAdminToken();

        return {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }
}
