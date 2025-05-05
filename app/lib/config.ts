import * as dotenv from "dotenv";

dotenv.config() // initializes the environment variables

function getDbUrl(): string {
    return process.env.DATABASE_URL as string
}

export const config = {
    dbUrl: getDbUrl()
}