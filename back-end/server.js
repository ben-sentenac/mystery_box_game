import Fastify from 'fastify';
import { AuthRoutes } from './domains/auth/auth.routes.js';
import fastifyJwt from '@fastify/jwt';
import fastifyMysql from '@fastify/mysql';
import fastifyEnv from '@fastify/env';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const envSchema = {
    type: 'object',
    required: ['MYSQL_CONNECTION_STRING', 'JWT_SECRET'],
    properties: {
        MYSQL_CONNECTION_STRING: {
            type: 'string',
        },
        JWT_SECRET: {
            type: 'string',
            default: 'your_secret_phrase'
        },
        GOOGLE_CLIENT_ID: {
            type: 'string'
        },
        GOOGLE_CLIENT_SECRET: {
            type: 'string'
        }
    }
};
const envOpts = {
    confKey: 'config', // optional, default: 'config'
    schema: envSchema,
    dotenv: {
        path: path.join(_dirname, '.env'),
        debug: true
    }
};
export async function buildServer() {
    const server = Fastify({
        logger: true
    });
    //load env
    await server.register(fastifyEnv, envOpts);
    //connect DB
    await server.register(fastifyMysql, {
        connectionString: server.config.MYSQL_CONNECTION_STRING,
        promise: true
    });
    //JWT
    server.register(fastifyJwt, {
        secret: 'your_secret_phrase',
    });
    //oauth plugin 
    //TODO
    //ADD API ROUTES
    server.register(AuthRoutes, { prefix: '/api/auth' });
    //ERRORS
    server.setErrorHandler((error, req, res) => {
        if (error.code === 'FST_ERR_VALIDATION') {
            return res.status(400).send({
                status: 'ERROR',
                message: error.message
            });
        }
    });
    server.setNotFoundHandler((req, res) => {
        const notfoundPayload = {
            status: 'NOT FOUND',
            message: 'Resource not found'
        };
        return res.status(404).send(notfoundPayload);
    });
    return server;
}
//# sourceMappingURL=server.js.map