import Handler from "../core/Handler";

export default class HelpHandler implements Handler<string> {
    handle(message: string): Promise<string> {
        return Promise.resolve('Seja bem vindo ao bot do grupo de estudos de NodeJS!')
    }
}