export type KeycloakUserInterface = {
    username: string;
    firstName?: string;
    email?: string;
    password?: string;
    enabled: boolean;
    emailVerified?: boolean;
    attributes?: KeycloakUserAttributesInterface;
    credentials?: KeycloakUserCredentialsInterface[];
};

export type KeycloakUserAttributesInterface = {
    api_user_id: string;
    locale?: string[];
};

export type KeycloakUserCredentialsInterface = {
    type: string;
    value: string;
    temporary?: boolean;
};

export type KeycloakUserRoleInterface = {
    id: string;
    name: string;
    description: string;
    composite: boolean;
    clientRole: boolean;
    containerId: string;
};
