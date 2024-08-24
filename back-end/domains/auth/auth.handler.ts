import { FastifyReply, FastifyRequest, RawServerBase } from 'fastify';
import { hash,compare } from 'bcrypt';
import { PoolConnection } from "mysql2/promise";
import { MySQLPromisePool } from '@fastify/mysql';

interface IResponse {
    status:'OK' | 'ERROR'
};

interface User {
    id:number,
    email:string,
    username:string
};
interface RegisterRequestBody {
    username: string,
    email: string,
    password: string
};

interface LoginRequestBody {
    email:string,
    password:string
};

interface ErrorResponsePayload extends IResponse {
    message:string
}

interface RegisterResponsePayload extends IResponse {
    data:User
};

interface LoginResponsePayload extends IResponse {
    token:string
};

/**
 * 
 * @param dbConnection 
 * @param user RegisterRequestBody
 * @returns [number] userid
 */
async function createUser(dbConnection, user: RegisterRequestBody) {
    //hash password
        const hashPassword = await hash(user.password, 10);
        const [result] = await dbConnection.query(`INSERT INTO users (username,email,password_hash,points,created_at,updated_at) VALUES (?,?,?,?,?,?)`, [
            user.username, user.email, hashPassword, 50, new Date(), new Date()
        ]);
        return result.inserId;
}

async function findByEmail(email:string,dbConnection) {
        const [user] = await dbConnection.query('SELECT email,password_hash FROM users WHERE email = ?',[email]);
        console.log('findByEmail',user);
        return user;
}

async function find(field:string,dbConnection) {
    const [user] = await dbConnection.query(`SELECT * FROM users WHERE ${field} = ?`);
    return user;
}


export async function authenticate() {

}

export const registerHandler = async function (req: FastifyRequest<{ Body: RegisterRequestBody }>, res: FastifyReply) {


    const { username, email, password } = req.body;
    let db;
    try {                                                                           
        db = await this.mysql.getConnection();
        const existingUser = await findByEmail(email,db);
        
        if (Array.isArray(existingUser) && existingUser.length  > 0) {
            const errorResponsePayload:ErrorResponsePayload = {
                status:'ERROR',
                message:`${email} or ${username} already in use!`
            }
            return res.status(400).send(errorResponsePayload);
        }
        const insertId = await createUser(db,{username,email,password});

        const payload:RegisterResponsePayload = {
            status:'OK',
            data:{id:insertId,username,email}
        }
        return res.status(201).send(payload);
    } catch (error) {
        console.error(error);
        //throw 500 
    } finally {
         db.release();
    }


}


export const loginHandler = async function (req:FastifyRequest<{Body:LoginRequestBody}>,res:FastifyReply) {
    const { email,password } = req.body;
    let db;
    try {
        db = await this.mysql.getConnection();  
        const [user] = await findByEmail(email,db);
        if(!user) {
            return res.status(404).send({status:'ERROR',message:'Wrong credentials'});
        }
        const  veryfied = await compare(password,user.password_hash);
        if(!veryfied) {
            return res.status(404).send({status:'ERROR',message:'Wrong credentials'});
        }
        const token = this.jwt.sign({email:user.email});
        const loginPayload:LoginResponsePayload = {
            status:'OK',
            token
        }
        return res.status(200).send(loginPayload);
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        db.release();
    }
}
