import AccountGateway, { GatewayAccountInputDTO } from "../../../domain/interfaces/AccountGateway";
import LinuxCommandExecutor from "./LinuxCommandExecutor";

export default class SystemAccountGateway implements AccountGateway {
    constructor(
        private readonly commandExecutor: LinuxCommandExecutor,
    ) { }

    async create(account: GatewayAccountInputDTO): Promise<number> {
        const cmd1 = `useradd -M -s /bin/false ${account.username} -e ${account.expirationDate}`;
        await this.commandExecutor.execute(cmd1);

        const cmd2 = `echo ${account.username}:${account.password} | chpasswd`;
        await this.commandExecutor.execute(cmd2);

        const cmd3 = `id -u ${account.username}`
        const id = await this.commandExecutor.execute(cmd3);
        return Promise.resolve(parseInt(id));
    }

    async getIdByUsername(username: string): Promise<number> {
        const cmd = `id -u ${username}`
        const id = await this.commandExecutor.execute(cmd);
        return Promise.resolve(parseInt(id));
    }

    async delete(username: string): Promise<void> {
        const cmd = `userdel --force ${username}`
        await this.commandExecutor.execute(cmd)
        return;
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