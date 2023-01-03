import Account, { ConnectionLimit, ExpirationDate, Password, Username } from "../entities/Account";
import AccountGateway from "../interfaces/AccountGateway";
import AccountRepository from "../interfaces/AccountRepository";

export default class CreateAccountUseCase {
    constructor(
        private accountRepository: AccountRepository,
        private accountGateway: AccountGateway
    ) { }

    async execute(data: CreateAccountInputDTO): Promise<number> {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + data.expiration_date);

        const accountId = await this.accountGateway.create({
            username: data.username,
            password: data.password,
            expirationDate: expirationDate.toISOString()
        });

        await this.accountRepository.create(new Account(
            accountId,
            new Username(data.username),
            new Password(data.password),
            new ConnectionLimit(data.connection_limit),
            new ExpirationDate(expirationDate)
        ))
        return accountId;
    }
}

export type CreateAccountInputDTO = {
    username: string;
    password: string;
    connection_limit: number;
    expiration_date: number;
}