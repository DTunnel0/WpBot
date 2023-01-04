export default interface Handler<T> {
    handle(message: string): Promise<T>
}