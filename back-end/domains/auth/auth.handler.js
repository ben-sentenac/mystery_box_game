import { hash, compare } from 'bcrypt';
;
;
;
;
;
;
/**
 *
 * @param dbConnection
 * @param user RegisterRequestBody
 * @returns [number] userid
 */
async function createUser(dbConnection, user) {
    //hash password
    const hashPassword = await hash(user.password, 10);
    const [result] = await dbConnection.query(`INSERT INTO users (username,email,password_hash,points,created_at,updated_at) VALUES (?,?,?,?,?,?)`, [
        user.username, user.email, hashPassword, 50, new Date(), new Date()
    ]);
    return result.inserId;
}
async function findByEmail(email, dbConnection) {
    const [user] = await dbConnection.query('SELECT email,password_hash FROM users WHERE email = ?', [email]);
    console.log('findByEmail', user);
    return user;
}
async function find(field, value, dbConnection) {
    const [user] = await dbConnection.query(`SELECT * FROM users WHERE ${field} = ?`, [value]);
    return user;
}
export async function authenticate() {
}
export const registerHandler = async function (req, res) {
    const { username, email, password } = req.body;
    let db;
    try {
        db = await this.mysql.getConnection();
        const existingUser = await findByEmail(email, db);
        if (Array.isArray(existingUser) && existingUser.length > 0) {
            const errorResponsePayload = {
                status: 'ERROR',
                message: `${email} or ${username} already in use!`
            };
            return res.status(400).send(errorResponsePayload);
        }
        const insertId = await createUser(db, { username, email, password });
        const payload = {
            status: 'OK',
            data: { id: insertId, username, email }
        };
        return res.status(201).send(payload);
    }
    catch (error) {
        console.error(error);
        //throw 500 
    }
    finally {
        db.release();
    }
};
export const loginHandler = async function (req, res) {
    const { email, password } = req.body;
    let db;
    try {
        db = await this.mysql.getConnection();
        const [user] = await findByEmail(email, db);
        if (!user) {
            //rerdirect login
            return res.redirect('/auth/login', 303);
        }
        const veryfied = await compare(password, user.password_hash);
        if (!veryfied) {
            return res.status(404).send({ status: 'ERROR', message: 'Email or password are incorrect' });
        }
        const token = this.jwt.sign({ email: user.email });
        const loginPayload = {
            status: 'OK',
            token
        };
        return res.status(200).send(loginPayload);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        db.release();
    }
};
export const getProfileHandler = async function (req, res) {
    const id = req.params?.id;
    let db;
    try {
        db = await this.mysql.getConnection();
        const [user] = await find('id', id, db);
        return {
            status: 'OK',
            data: user
        };
    }
    catch (error) {
        //
        console.error(error);
        throw error;
    }
};
//# sourceMappingURL=auth.handler.js.map