import { Database } from 'sqlite3';

const create_if_not_exists_sql = `
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        connection_limit INTEGER NOT NULL,
        expiration_date DATETIME NOT NULL
    )
`

export default class Connection {
    private static __instance: Connection;
    private __db: Database;

    private constructor() {
        this.__db = new Database('db.sqlite3');
    }

    static getInstance(): Connection {
        if (!Connection.__instance) {
            Connection.__instance = new Connection();
            Connection.__instance.db.exec(create_if_not_exists_sql);
        }
        return Connection.__instance;
    }

    get db(): Database {
        return this.__db;
    }
}
