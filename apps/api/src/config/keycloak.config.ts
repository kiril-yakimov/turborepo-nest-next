export const KEYCLOAK_CONFIG_KEY = 'keycloak';

export type KeycloakConfig = {
    authUrl: string;
    realm: string;
    clientId: string;
    clientSecret: string;
    publicKey: string;
};
export const keycloak = (): {
    [KEYCLOAK_CONFIG_KEY]: KeycloakConfig;
} => ({
    [KEYCLOAK_CONFIG_KEY]: {
        authUrl: process.env.KEYCLOAK_URL,
        realm: process.env.KEYCLOAK_REALM,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
        publicKey: process.env.KEYCLOAK_REALM_PUBLIC_KEY,
    },
});
