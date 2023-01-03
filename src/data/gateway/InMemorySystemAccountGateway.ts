import AccountGateway, { GatewayAccountInputDTO } from "../../domain/interfaces/AccountGateway";

export default class InMemorySystemAccountGateway implements AccountGateway {
    private __accounts: GatewayAccountInputDTO[] = [];

    async create(account: GatewayAccountInputDTO): Promise<number> {
        this.__accounts.push(account);
        return Promise.resolve(this.__accounts.length);
    }

    async getIdByUsername(username: string): Promise<number> {
        const account = this.__accounts.find(account => account.username === username);
        if (!account) {
            return Promise.reject(new Error('Conta não encontrada'));
        }
        return Promise.resolve(this.__accounts.indexOf(account) + 1);
    }
}