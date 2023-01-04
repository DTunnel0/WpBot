export default interface LinuxCommandExecutor {
    execute(command: string): Promise<string>;
}