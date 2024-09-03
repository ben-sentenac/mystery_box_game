import { MySQLPromisePool } from "@fastify/mysql";
declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPromisePool,
        config: Config,
    }
}

export type Config = {
    MYSQL_CONNECTION_STRING?: string,
    JWT_SECRET?: string,
    GOOGLE_CLIENT_ID:string,
    GOOGLE_CLIENT_SECRET:string
};
export interface IResponse {
    status:'OK' | 'ERROR' | 'NOT FOUND'
};
export interface ErrorResponsePayload extends IResponse {
    status:'ERROR',
    message:string
}
export interface NotFoundResponsePayload extends IResponse {
    status:'NOT FOUND'
    message:'Resource not found'
}