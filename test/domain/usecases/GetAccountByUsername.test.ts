import { describe, expect, test } from '@jest/globals';

import InMemorySystemAccountGateway from '../../../src/data/gateway/InMemorySystemAccountGateway';
import InMemoryAccountRepository from '../../../src/data/repository/InMemoryAccountRepository';
import CreateAccountUseCase from '../../../src/domain/usecases/CreateAccount';
import GetAccountByUsername from '../../../src/domain/usecases/GetAccountByUsername';

describe('deve testar o caso de uso de busca pelo nome', () => {
    test('deve buscar uma conta pelo nome de usuario', async () => {
        const repo = new InMemoryAccountRepository();
        const gateway = new InMemorySystemAccountGateway();
        const useCase = new CreateAccountUseCase(repo, gateway);

        await useCase.execute({
            'username': 'teste',
            'password': '1234',
            'connection_limit': 10,
            'expiration_date': 10
        });

        const getAccount = new GetAccountByUsername(repo, gateway);
        const account = await getAccount.execute('teste');

        expect('teste').toBe(account.username);
        expect('1234').toBe(account.password);
    })

    test('deve buscar uma conta pelo nome de usuario e retornar erro', async () => {
        const repo = new InMemoryAccountRepository();
        const gateway = new InMemorySystemAccountGateway();
        const useCase = new GetAccountByUsername(repo, gateway);

        expect(async () => {
            await useCase.execute('teste');
        }).rejects.toThrowError('Conta não encontrada');
    })
})