import { describe, expect, test } from '@jest/globals';

import Account, {
    Username, UsernameError,
    Password, PasswordError,
    ConnectionLimit, ConnectionLimitError,
    ExpirationDate, ExpirationDateError,

} from '../../../src/domain/entities/Account'


describe('deve testar a entidade Account', () => {
    test('verifica se a conta e valida', async () => {
        const date = new Date();
        date.setDate(date.getDate() + 10)

        const account = new Account(
            1,
            new Username('Teste'),
            new Password('Teste'),
            new ConnectionLimit(10),
            new ExpirationDate(date)
        );
        expect('Teste').toBe(account.getUsername().value)
        expect('Teste').toBe(account.getPassword().value)
    })

    test('verifica se o nome de usuario e invalido', async () => {
        expect(() => {
            const acc = new Account(
                1,
                new Username('T'),
                new Password('T'),
                new ConnectionLimit(10),
                new ExpirationDate(new Date())
            );
        }).toThrow(UsernameError)
    });

    test('verifica se a senha e invalida', async () => {
        expect(() => {
            const acc = new Account(
                1,
                new Username('teste'),
                new Password('T'),
                new ConnectionLimit(10),
                new ExpirationDate(new Date())
            );
        }).toThrow(PasswordError)
    });

    test('verifica se o limite de conexoes e invalido', async () => {

        expect(() => {
            const acc = new Account(
                1,
                new Username('teste'),
                new Password('teste'),
                new ConnectionLimit(-1),
                new ExpirationDate(new Date())
            );
        }).toThrow(ConnectionLimitError)
    });

    test('verifica se a data de expiracao e invalida', async () => {
        expect(() => {
            const acc = new Account(
                1,
                new Username('teste'),
                new Password('teste'),
                new ConnectionLimit(10),
                new ExpirationDate(new Date())
            );
        }).toThrow(ExpirationDateError)
    })
})
