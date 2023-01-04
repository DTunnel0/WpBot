import Logger from "../../common/Logger";
import Account, { ConnectionLimit, ExpirationDate, Password, Username } from "../entities/Account";
import AccountGateway from "../interfaces/AccountGateway";
import AccountRepository from "../interfaces/AccountRepository";

export default class CreateAccountUseCase {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly accountGateway: AccountGateway,
        private readonly logger: Logger,
    ) { }

    async execute(data: CreateAccountInputDTO): Promise<number> {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + data.expiration_date);
        let accountId;

        try {
            this.logger.info(`Criando conta: ${data.username}`)
            accountId = await this.accountGateway.create({
                username: data.username,
                password: data.password,
                expirationDate: expirationDate.toISOString()
            });
        } catch (e: any) {
            this.logger.error('Error criar conta no gateway de usuario:', e)
            throw e;
        }

        try {
            this.logger.info(`Criando conta no banco de dados com id: ${accountId} | ${data.username}`);
            await this.accountRepository.create(new Account(
                accountId,
                new Username(data.username),
                new Password(data.password),
                new ConnectionLimit(data.connection_limit),
                new ExpirationDate(expirationDate)
            ))

            this.logger.info(`Conta criada com sucesso com id: ${accountId} | ${data.username}`);
            return accountId;
        } catch (e: any) {
            this.logger.error('Error criar conta no banco de dados:', e)
            this.accountGateway.delete(data.username)
            throw e;
        }
    }
}

export type CreateAccountInputDTO = {
    username: string;
    password: string;
    connection_limit: number;
    expiration_date: number;
}