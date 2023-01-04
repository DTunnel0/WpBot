import Logger from "../../common/Logger";

export default class NodeLogger implements Logger {
    info(message: string): void {
        console.log(message)
    }

    error(message: string, error: Error): void {
        console.error(message, error)
    }

    warn(message: string): void {
        console.warn(message)
    }
}