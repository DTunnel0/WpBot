import AccountGateway, { GatewayAccountInputDTO } from "../../../domain/interfaces/AccountGateway";
import SSHConnection from "./SSHConnection";


export default class SSHAccountGateway implements AccountGateway {
    constructor(private readonly connection: SSHConnection) { }

    async create(account: GatewayAccountInputDTO): Promise<number> {
        const cmd1 = `useradd -M -s /bin/false ${account.username} -e ${account.expirationDate}`;
        await this.connection.execute(cmd1);

        const cmd2 = `echo ${account.username}:${account.password} | chpasswd`;
        await this.connection.execute(cmd2);

        const cmd3 = `id -u ${account.username}`
        const id = await this.connection.execute(cmd3);
        return Promise.resolve(parseInt(id));
    }

    async getIdByUsername(username: string): Promise<number> {
        const cmd = `id -u ${username}`
        const id = await this.connection.execute(cmd);
        return Promise.resolve(parseInt(id));
    }

    async delete(username: string): Promise<void> {
        const cmd = `userdel --force ${username}`
        await this.connection.execute(cmd)
        return Promise.resolve();
    }

    async exists(username: string): Promise<boolean> {
        try {
            await this.getIdByUsername(username);
            return Promise.resolve(true);
        } catch (e: any) {
            return Promise.resolve(false);
        }
    }
}