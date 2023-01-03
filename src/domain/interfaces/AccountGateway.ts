export default interface AccountGateway {
    create(account: GatewayAccountInputDTO): Promise<number>;

    getIdByUsername(username: string): Promise<number>;
}

export type GatewayAccountInputDTO = {
    username: string;
    password: string;
    expirationDate: string;
}