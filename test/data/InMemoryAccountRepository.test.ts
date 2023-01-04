import { describe, expect, test } from '@jest/globals';
import InMemoryAccountRepository from '../../src/data/repository/InMemoryAccountRepository';
import Account, { ConnectionLimit, ExpirationDate, Password, Username } from '../../src/domain/entities/Account';

describe('deve testar o repositorio de contas', () => {
    test('deve criar uma conta', async () => {
        const date = new Date();
        date.setDate(date.getDate() + 10)

        const repo = new InMemoryAccountRepository();
        const accountId = 1;

        const account = new Account(
            accountId,
            new Username('Teste'),
            new Password('Teste'),
            new ConnectionLimit(10),
            new ExpirationDate(date)
        );

        repo.create(account)

        const result = await repo.getById(accountId)
        if (!result) throw new Error('Conta não encontrada')
        expect(result.getUsername().value).toBe('Teste')
    })

    test('deve retornar erro ao buscar uma conta inexistente', async () => {
        const repo = new InMemoryAccountRepository();
        expect(await repo.getById(1)).toBe(undefined)
    })
})