import { describe, expect, test } from '@jest/globals';

import SSHConnectionImpl from '../../src/data/gateway/remote/SSHConnectionImpl';
import SSHAccountGateway from '../../src/data/gateway/remote/SSHAccountGateway';

import dotenv from 'dotenv';

dotenv.config();

describe('deve testar o gateway de contas remoto SSH', () => {
    test('deve criar uma conta no servidor', async () => {
        const host = process.env.SSH_HOST || 'localhost';
        const username = process.env.SSH_USERNAME || 'root';
        const password = process.env.SSH_PASSWORD || 'root';

        const connection = new SSHConnectionImpl();
        await connection.connect(host, username, password);

        const gateway = new SSHAccountGateway(connection);
        const result = await gateway.create({
            username: 'Teste',
            password: 'Teste',
            expirationDate: new Date().toISOString().split('T')[0]
        })

        const accountId = await gateway.getIdByUsername('Teste');
        expect(accountId).toBe(result);

        await gateway.delete('Teste');
        await connection.close();
    })
})