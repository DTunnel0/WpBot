import { describe, expect, test } from '@jest/globals';
import LinuxCommandExecutor from '../../src/data/gateway/local/LinuxCommandExecutor';
import SystemAccountGateway from '../../src/data/gateway/local/SystemAccountGateway';

class LinuxCommandExecutorMock implements LinuxCommandExecutor {
    async execute(command: string): Promise<string> {
        return Promise.resolve('1');
    }
}

class LinuxCommandExecutorWithErrorMock implements LinuxCommandExecutor {
    async execute(command: string): Promise<string> {
        return Promise.reject(new Error('Erro ao executar comando'));
    }
}

describe('deve testar o gateway de contas', () => {
    test('deve criar uma conta', async () => {
        const gateway = new SystemAccountGateway(new LinuxCommandExecutorMock());

        const result = await gateway.create({
            username: 'Teste',
            password: 'Teste',
            expirationDate: new Date().toISOString().split('T')[0],
        });
        expect(result).toBe(1)
    })

    test('deve retornar erro ao criar uma conta', async () => {
        const gateway = new SystemAccountGateway(new LinuxCommandExecutorWithErrorMock());

        expect(gateway.create({
            username: 'Teste',
            password: 'Teste',
            expirationDate: new Date().toISOString().split('T')[0],
        })).rejects.toThrow()
    })
})