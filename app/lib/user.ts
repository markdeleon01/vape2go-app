import sql from './database'
import bcrypt from 'bcrypt'

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

const pepper = BCRYPT_PASSWORD
const saltRounds = SALT_ROUNDS

export interface User {
    id?: number
    username: string
    password: string
}

export class UserStore {

    // method to create a User
    async create(u: User) {
        try {
            // hash, salt and pepper the password to avoid storing plain text passwords in the database
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds as string)
            )

            const data = await sql`INSERT INTO users (username, password) VALUES(${u.username}, ${hash}) RETURNING *`

            return data
        } catch (error) {
            throw new Error(`Unable to create user (${u.username}): ${error}`)
        }
    }

    // method to authenticate validity of a specified User (check if specified User exists)
    async authenticate(u: User) {
        try {
            let theUser = null
            const data = await sql`SELECT * FROM users WHERE username=${u.username}`
            const user = data[0]

            // validate the hashed password
            if (bcrypt.compareSync(u.password + pepper, user.password)) {
                theUser = user
            }

            return theUser // return the user if authenticated, else return null
        } catch (error) {
            throw new Error('Unable to authenticate user ('+JSON.stringify(u)+'): '+{error})
        }
    }
}