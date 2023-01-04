import { default as ConncetionDB } from "./data/database/Connection";
import SSHConnectionImpl from "./data/gateway/remote/SSHConnectionImpl";

import InMemorySystemAccountGateway from "./data/gateway/local/InMemorySystemAccountGateway";
import SSHAccountGateway from "./data/gateway/remote/SSHAccountGateway";
import InMemoryAccountRepository from "./data/repository/InMemoryAccountRepository";

import CreateAccountUseCase from "./domain/usecases/CreateAccount";
import GetAccountByUsername from "./domain/usecases/GetAccountByUsername";
import Connection from "./infra/whatsapp/core/Connection";

import CreateAccountHandler from "./infra/whatsapp/handlers/CreateAccount";
import HelpHandler from './infra/whatsapp/handlers/Help'

import NodeLogger from "./infra/logger/NodeLogger";
import BaileysPresenter from "./infra/presenters/BaileysPresenter";
import SqliteAccountRepository from "./data/repository/SqliteAccountRepository";

import dotenv from 'dotenv';
dotenv.config();

async function main() {
    // const repo = new InMemoryAccountRepository();
    const repo = new SqliteAccountRepository(ConncetionDB.getInstance())

    // const gateway = new InMemorySystemAccountGateway();
    const sshConn = new SSHConnectionImpl();
    await sshConn.connect(
        process.env.SSH_HOST || 'localhost',
        process.env.SSH_USERNAME || 'root',
        process.env.SSH_PASSWORD || 'root'
    );
    const gateway = new SSHAccountGateway(sshConn);
    const createAccount = new CreateAccountUseCase(repo, gateway, new NodeLogger());
    const getAccount = new GetAccountByUsername(repo, gateway);

    const connection = await Connection.create();
    connection.registerHandler('!help', new HelpHandler())
    connection.registerHandler('!ssh', new CreateAccountHandler(createAccount, getAccount, new BaileysPresenter()))

    await connection.initialize()
    connection.start()
}

main()