import { GetAccountByUsernameOutputDTO } from "../../domain/usecases/GetAccountByUsername";
import CreateAccountPresenter from "./Presenter";

export default class BaileysPresenter implements CreateAccountPresenter<string> {
    present(data: GetAccountByUsernameOutputDTO): string {
        let message = '*=======[Conta SSH]=======*\n';
        message += `*Nome de usuario:* ${data.username}\n`;
        message += `*Senha:* ${data.password}\n`;
        message += `*Conexões máximas:* ${data.connection_limit}\n`;
        message += `*Expira em:* ${data.expiration_date.split('T')[0]}\n`;
        message += '*========================*';
        return message;
    }
}