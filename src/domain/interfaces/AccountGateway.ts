export default interface AccountGateway {
    create(account: GatewayAccountInputDTO): Promise<number>;

    getIdByUsername(username: string): Promise<number>;

    delete(username: string): Promise<void>;

    exists(username: string): Promise<boolean>;
}

export type GatewayAccountInputDTO = {
    username: string;
    password: string;
    expirationDate: string;
}