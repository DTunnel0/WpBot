import Account from "../../domain/entities/Account";
import AccountRepository from "../../domain/interfaces/AccountRepository";
import Connection from "../database/Connection";

export default class SqliteAccountRepository implements AccountRepository {
    constructor(private readonly connection: Connection) {
        this.connection = connection;
    }

    async create(account: Account): Promise<void> {
        const query = `INSERT INTO accounts (id, username, password, connection_limit, expiration_date) VALUES (?, ?, ?, ?, ?)`;
        const statement = this.connection.db.prepare(query);
        const promise = new Promise<void>((resolve, reject) => {
            statement.run([
                account.getId(),
                account.getUsername().value,
                account.getPassword().value,
                account.getConnectionLimit().value,
                account.getExpirationDate().value
            ], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return promise;
    }

    async getById(id: number): Promise<Account> {
        const statement = this.connection.db.prepare(`SELECT * FROM accounts WHERE id = ?`);
        const promise = new Promise<Account>((resolve, reject) => {
            statement.get(id, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(Account.create({
                        id: row.id,
                        username: row.username,
                        password: row.password,
                        connection_limit: row.connection_limit,
                        expiration_date: row.expiration_date
                    }));
                }
            });
        });
        return promise;
    }

    async delete(id: number): Promise<void> {
        const statement = this.connection.db.prepare(`DELETE FROM accounts WHERE id = ?`);
        const promise = new Promise<void>((resolve, reject) => {
            statement.run(id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return promise;
    }
}