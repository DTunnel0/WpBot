import { GetAccountByUsernameOutputDTO } from "../../domain/usecases/GetAccountByUsername";
import CreateAccountPresenter from "./Presenter";

export default class BaileysPresenter implements CreateAccountPresenter<string> {
    present(data: GetAccountByUsernameOutputDTO): string {
        let message = '===== [SSH Account] =====\n';
        message += `Username: ${data.username}\n`;
        message += `Password: ${data.password}\n`;
        message += `Max Connection: ${data.connection_limit}\n`;
        message += `Expires At: ${data.expiration_date}\n`;
        message += '========================';
        return message;
    }
}