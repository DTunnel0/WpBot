import Account from "../../domain/entities/Account";
import AccountRepository from "../../domain/interfaces/AccountRepository";

export default class InMemoryAccountRepository implements AccountRepository {
    private __items: Account[] = []

    async create(account: Account): Promise<void> {
        this.__items.push(account)
    }

    getById(id: number): Promise<Account | undefined> {
        const account = this.__items.find(a => a.getId() == id);
        return new Promise((resolve) => resolve(account))
    }

    delete(id: number): Promise<void> {
        this.__items = this.__items.filter(a => a.getId() != id);
        return new Promise((resolve) => resolve());
    }
}