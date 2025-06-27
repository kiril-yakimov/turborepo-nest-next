import { app } from './app.config';
import { database } from './database.config';
import { keycloak } from './keycloak.config';
import { logger } from './logger.config';
import { redis } from './redis.config';

export * from './app.config';
export * from './database.config';
export * from './keycloak.config';
export * from './logger.config';
export * from './redis.config';

export default [app, database, keycloak, logger, redis];
