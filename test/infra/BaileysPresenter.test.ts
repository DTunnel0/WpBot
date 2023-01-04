import { test, expect } from '@jest/globals';
import { GetAccountByUsernameOutputDTO } from '../../src/domain/usecases/GetAccountByUsername';

import BaileysPresenter from '../../src/infra/presenters/BaileysPresenter';

test('Deve testar o presenter BaileysPresenter', () => {
    const data: GetAccountByUsernameOutputDTO = {
        username: 'teste',
        password: '123456',
        connection_limit: 2,
        expiration_date: '2022-10-10'
    }

    let message = '===== [SSH Account] =====\n';
    message += `Username: ${data.username}\n`;
    message += `Password: ${data.password}\n`;
    message += `Max Connection: ${data.connection_limit}\n`;
    message += `Expires At: ${data.expiration_date}\n`;
    message += '========================';

    const presenter = new BaileysPresenter();
    const result = presenter.present(data);
    expect(result).toBe(message)
});