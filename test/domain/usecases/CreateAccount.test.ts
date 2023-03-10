import { describe, expect, test } from '@jest/globals';
import Logger from '../../../src/common/Logger';

import InMemorySystemAccountGateway from '../../../src/data/gateway/local/InMemorySystemAccountGateway';
import InMemoryAccountRepository from '../../../src/data/repository/InMemoryAccountRepository';
import CreateAccountUseCase from '../../../src/domain/usecases/CreateAccount';
import GetAccountByIdUseCase from '../../../src/domain/usecases/GetAccountById';

class ConsoleLoggger implements Logger {
    info(message: string): void {
        console.log(message);
    }

    error(message: string, error: Error): void {
        console.log(message, error);
    }

    warn(message: string): void {
        console.log(message);
    }
}

describe('deve testar o caso de uso de criar conta', () => {
    test('deve criar uma conta', async () => {
        const repo = new InMemoryAccountRepository();
        const gateway = new InMemorySystemAccountGateway();
        const useCase = new CreateAccountUseCase(repo, gateway, new ConsoleLoggger());

        const result = await useCase.execute({
            'username': 'teste',
            'password': '1234',
            'connection_limit': 10,
            'expiration_date': 10
        });

        const getAccountUseCase = new GetAccountByIdUseCase(repo);
        const account = await getAccountUseCase.execute(result);

        expect('teste').toBe(account.username);
        expect('1234').toBe(account.password);
    })
})