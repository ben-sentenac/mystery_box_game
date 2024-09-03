import Oauth2, { FastifyOAuth2Options } from "@fastify/oauth2";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import process from "node:process";



export async function oAuthPlugin<FastifyPluginCallback>(_instance:FastifyInstance, opts:FastifyOAuth2Options) {
  
    const googleOAuth2Options:FastifyOAuth2Options = {
        name: 'googleOAuth2',
        scope: ['email', 'profile'],
        credentials: {
            client: {
                id: _instance.config.GOOGLE_CLIENT_ID ?? opts?.credentials?.client?.id ,
                secret: _instance.config.GOOGLE_CLIENT_SECRET ?? opts?.credentials?.client?.secret,
            },
            auth: Oauth2.fastifyOauth2.GOOGLE_CONFIGURATION
        },
        startRedirectPath: '/api/auth/login/google',
        callbackUri: `${process.env.BASE_URL}/api/auth/login/google/callback`,
    }

    const option = Object.keys(opts).length !== 0 ? opts : googleOAuth2Options;
    _instance.register(Oauth2,option);
}