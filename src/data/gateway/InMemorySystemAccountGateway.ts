import AccountAlreadyExistsError from "../../domain/errors/AccountAlreadyExistsError";
import AccountNotFoundError from "../../domain/errors/AccountNotFoundError";
import AccountGateway, { GatewayAccountInputDTO } from "../../domain/interfaces/AccountGateway";

export default class InMemorySystemAccountGateway implements AccountGateway {
    private __accounts: GatewayAccountInputDTO[] = [];

    async create(account: GatewayAccountInputDTO): Promise<number> {
        if (this.__accounts.find(a => a.username == account.username))
            throw new AccountAlreadyExistsError('Ja existe uma conta com esse nome de usuario')
        this.__accounts.push(account);
        return Promise.resolve(this.__accounts.length);
    }

    async getIdByUsername(username: string): Promise<number> {
        const account = this.__accounts.find(account => account.username === username);
        if (!account) {
            return Promise.reject(new AccountNotFoundError('Conta não encontrada'));
        }
        return Promise.resolve(this.__accounts.indexOf(account) + 1);
    }

    async delete(username: string): Promise<void> {
        await this.getIdByUsername(username);
        this.__accounts = this.__accounts.filter(a => a.username != username)
    }
}