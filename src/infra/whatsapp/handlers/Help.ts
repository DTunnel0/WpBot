import Handler from "../core/Handler";

export default class HelpHandler implements Handler<string> {
    handle(message: string): Promise<string> {
        return Promise.resolve('*Bot help: Por: @DuTra01*')
    }
}