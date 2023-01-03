import { describe, expect, test } from '@jest/globals';
import InMemoryAccountRepository from '../../src/data/repository/InMemoryAccountRepository';
import Account, { ConnectionLimit, ExpirationDate, Password, Username } from '../../src/domain/entities/Account';
import AccountNotFoundError from '../../src/domain/errors/AccountNotFoundError';

describe('deve testar o repositorio de contas', () => {
    test('deve criar uma conta', async () => {
        const date = new Date();
        date.setDate(date.getDate() + 10)

        const repo = new InMemoryAccountRepository();
        const accountId = await repo.nextId();

        const account = new Account(
            accountId,
            new Username('Teste'),
            new Password('Teste'),
            new ConnectionLimit(10),
            new ExpirationDate(date)
        );

        repo.create(account)

        const result = await repo.getById(accountId)
        expect(result.getUsername().value).toBe('Teste')
    })

    test('deve retornar erro ao buscar uma conta inexistente', async () => {
        const repo = new InMemoryAccountRepository();
        expect(() => {
            repo.getById(1)
        }).toThrow(AccountNotFoundError)
    })
})