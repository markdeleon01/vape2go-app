function getDbUrl(): string {
    return process.env.DATABASE_URL as string
}

export const config = {
    dbUrl: getDbUrl()
}