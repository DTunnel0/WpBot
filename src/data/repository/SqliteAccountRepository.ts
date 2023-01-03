import Account from "../../domain/entities/Account";
import AccountRepository from "../../domain/interfaces/AccountRepository";
import Connection from "../database/Connection";

export default class SqliteAccountRepository implements AccountRepository {
    constructor(private readonly connection: Connection) {
        this.connection = connection;
    }

    create(account: Account): Promise<void> {
        this.connection.db.exec(`
            INSERT INTO accounts (
                username,
                password,
                connection_limit,
                expiration_date
            ) VALUES (
                '${account.getUsername().value}',
                '${account.getPassword().value}',
                '${account.getConnectionLimit().value}',
                '${account.getExpirationDate().value}'
            )
        `)
        return new Promise((resolve) => resolve());
    }

    getById(id: number): Promise<Account> {
        const promise = new Promise<Account>((resolve, reject) => {
            this.connection.db.get(`SELECT * FROM accounts WHERE id = ${id}`, (err, row) => {
                if (err) reject(err);
                resolve(Account.create({
                    id: row.id,
                    username: row.username,
                    password: row.password,
                    connection_limit: row.connection_limit,
                    expiration_date: row.expiration_date
                }));
            });
        });
        return promise;
    }

    delete(id: number): Promise<void> {
        this.connection.db.exec(`DELETE FROM accounts WHERE id = ${id}`);
        return new Promise((resolve) => resolve());
    }
}