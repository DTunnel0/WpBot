import AccountNotFoundError from "../errors/AccountNotFoundError";
import AccountGateway from "../interfaces/AccountGateway";
import AccountRepository from "../interfaces/AccountRepository";

export default class GetAccountByUsername {
    constructor(
        private accountRepository: AccountRepository,
        private accountGateway: AccountGateway
    ) { }

    async execute(username: string): Promise<GetAccountByUsernameOutputDTO> {
        const accountId = await this.accountGateway.getIdByUsername(username);
        const account = await this.accountRepository.getById(accountId);
        if (!account) throw new AccountNotFoundError('Conta não encontrada')
        return {
            username: account.getUsername().value,
            password: account.getPassword().value,
            connection_limit: account.getConnectionLimit().value,
            expiration_date: account.getExpirationDate().value.toISOString()
        };
    }
}

export type GetAccountByUsernameOutputDTO = {
    username: string;
    password: string;
    connection_limit: number;
    expiration_date: string;
}