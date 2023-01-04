import AccountNotFoundError from "../errors/AccountNotFoundError";
import AccountRepository from "../interfaces/AccountRepository";

export default class GetAccountByIdUseCase {
    constructor(
        private accountRepository: AccountRepository,
    ) { }

    async execute(id: number): Promise<GetAccountOutputDTO> {
        const account = await this.accountRepository.getById(id);

        if (!account)
            throw new AccountNotFoundError('Nao foi possivel encontrar a conta');

        return {
            username: account.getUsername().value,
            password: account.getPassword().value,
            connection_limit: account.getConnectionLimit().value,
            expiration_date: account.getExpirationDate().value.toISOString()
        }
    }
}

export type GetAccountOutputDTO = {
    username: string;
    password: string;
    connection_limit: number;
    expiration_date: string;
}
