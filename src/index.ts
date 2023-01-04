import { default as ConncetionDB } from "./data/database/Connection";

import InMemorySystemAccountGateway from "./data/gateway/InMemorySystemAccountGateway";
import InMemoryAccountRepository from "./data/repository/InMemoryAccountRepository";

import CreateAccountUseCase from "./domain/usecases/CreateAccount";
import GetAccountByUsername from "./domain/usecases/GetAccountByUsername";
import Connection from "./infra/whatsapp/core/Connection";

import CreateAccountHandler from "./infra/whatsapp/handlers/CreateAccount";
import HelpHandler from './infra/whatsapp/handlers/Help'

import NodeLogger from "./infra/logger/NodeLogger";
import BaileysPresenter from "./infra/presenters/BaileysPresenter";
import SqliteAccountRepository from "./data/repository/SqliteAccountRepository";

async function main() {
    // const repo = new InMemoryAccountRepository();
    const repo = new SqliteAccountRepository(ConncetionDB.getInstance())

    const gateway = new InMemorySystemAccountGateway();
    const logger = new NodeLogger();

    const createAccount = new CreateAccountUseCase(repo, gateway, logger);
    const getAccount = new GetAccountByUsername(repo, gateway);

    const presenter = new BaileysPresenter();

    const connection = await Connection.create();
    connection.registerHandler('!help', new HelpHandler())
    connection.registerHandler('!ssh', new CreateAccountHandler(createAccount, getAccount, presenter))
    await connection.initialize()
    connection.start()
}

main()