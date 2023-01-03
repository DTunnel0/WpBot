import Account from "../entities/Account";

export default interface AccountRepository {
    create(account: Account): Promise<void>;

    getById(id: number): Promise<Account>;
}