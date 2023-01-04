import { GetAccountByUsernameOutputDTO } from "../../domain/usecases/GetAccountByUsername";

export default interface CreateAccountPresenter<T> {
    present: (data: GetAccountByUsernameOutputDTO) => T;
}