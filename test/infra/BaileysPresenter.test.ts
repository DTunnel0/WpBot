import { test, expect } from '@jest/globals';
import { GetAccountByUsernameOutputDTO } from '../../src/domain/usecases/GetAccountByUsername';

import BaileysPresenter from '../../src/infra/presenters/BaileysPresenter';

test('Deve testar o presenter BaileysPresenter', () => {
    const data: GetAccountByUsernameOutputDTO = {
        username: 'teste',
        password: '123456',
        connection_limit: 2,
        expiration_date: '2022-10-10T00:00:00.000Z'
    }

    let message = '====== [Conta SSH] ======\n';
    message += `Nome de usuario: ${data.username}\n`;
    message += `Senha: ${data.password}\n`;
    message += `Conexões máximas: ${data.connection_limit}\n`;
    message += `Expira em: ${data.expiration_date.split('T')[0]}\n`;
    message += '========================';

    const presenter = new BaileysPresenter();
    const result = presenter.present(data);
    expect(result).toBe(message)
});