import CreateAccountUseCase from "../../../domain/usecases/CreateAccount";
import GetAccountByUsername from "../../../domain/usecases/GetAccountByUsername";
import CreateAccountPresenter from "../../presenters/Presenter";
import Handler from "../core/Handler";

export default class CreateAccountHandler implements Handler<string> {
    constructor(
        private readonly createAccount: CreateAccountUseCase,
        private readonly getAccount: GetAccountByUsername,
        private readonly presenter: CreateAccountPresenter<string>,
    ) { }

    async handle(message: string): Promise<string> {
        try {
            let [username, password, connectionLimit, expirationDays] = message.split(' ')
            await this.createAccount.execute({
                username: username,
                password: password,
                expiration_date: parseInt(expirationDays),
                connection_limit: parseInt(connectionLimit),
            })
            const data = await this.getAccount.execute(username);
            return Promise.resolve(this.presenter.present(data));
        } catch (err: any) {
            return Promise.resolve('Error: ' + err.message);
        }
    }
}