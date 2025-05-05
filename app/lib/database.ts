import * as c from './config'
import { neon } from "@neondatabase/serverless"

const config = {
    dbUrl: c.config.dbUrl
}

const sql = neon(config.dbUrl)


export default sql