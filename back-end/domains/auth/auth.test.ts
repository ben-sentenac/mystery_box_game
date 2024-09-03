import test, { after, before } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";
import { buildServer } from "../../server.js";
import { FastifyInstance } from "fastify";
import { PoolConnection } from "mysql2/promise";

let app:FastifyInstance | null;


test('auth test suite', async (t) => {

    app = await buildServer();
    let db:PoolConnection;
    let user = {
        username: 'jhon',
        email: 'jhondoe@exemple.com',
        password: 'asecretkey'
    };

    before(async () => {
        try {
            if (app.mysql) {
                db = await app.mysql.getConnection();
                await db.query('TRUNCATE users');
                console.log('DATABASE CLEANED');
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    });

    after(async () => {
        db.release();
        await app.close();
    });

    await t.test('POST /auth/register', async (t) => {
        await t.test('it should create user', async (t) => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/auth/register',
                body: user
            });

            strictEqual(response.statusCode, 201);
            deepStrictEqual(response.json(), { status: 'OK', data: {} });
        });

        await t.test('it should respond 400 status when user exists', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/auth/register',
                body: user
            });

            strictEqual(response.statusCode, 400);
            deepStrictEqual(response.json(), { status: 'ERROR', message: `${user.email} or ${user.username} already in use!` });
        });
        await t.test('it should respond 400 when missing required field', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/auth/register',
                body: {
                    username: 'ben'
                }
            });

            strictEqual(response.statusCode, 400);
            deepStrictEqual(response.json(), { status: 'ERROR', message: "body must have required property 'email'" });
        });
    });

    await t.test('POST /auth/login', async (t) => {

        await t.test('it should login', async (t) => {
            const response = await app.inject({
                url:'/api/auth/login',
                method:'POST',
                body:{
                    email:user.email,
                    password:user.password
                }
            });
            strictEqual(response.statusCode,200);
            deepStrictEqual(response.json(),{status:'OK',token:response.json().token});
        });
        await t.test('login should fail if wrong password ', async (t) => {
            const response = await app.inject({
                url:'/api/auth/login',
                method:'POST',
                body:{
                    email:user.email,
                    password:'2158'
                }
            });
            strictEqual(response.statusCode,404);
            deepStrictEqual(response.json(),{status:'ERROR',message:'Email or password are incorrect'});
        });

        await t.test('login should fail if wrong email ', async (t) => {
            const response = await app.inject({
                url:'/api/auth/login',
                method:'POST',
                body:{
                    email:'user@exemple.com',
                    password:'21582123585'
                }
            });
            strictEqual(response.statusCode,303);
        });
    });

    await t.test('GET /auth/:id', async (t) => {
        await t.test('should show user profile', async(t) => {
            const response = await app.inject({
                url:'/api/auth/1',
                method:'GET',
            });
            console.log(response.json());
            strictEqual(response.statusCode,200);
            strictEqual(response.json().data.id,'1');
        });
    })
});
