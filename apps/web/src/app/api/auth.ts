import { AuthOptions, getServerSession } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import https from "https";

const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID as string,
            clientSecret: process.env.KEYCLOAK_SECRET as string,
            issuer: process.env.KEYCLOAK_ISSUER,
            httpOptions: {
                agent: new https.Agent({ rejectUnauthorized: false }),
            },
        })
    ],
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession };

