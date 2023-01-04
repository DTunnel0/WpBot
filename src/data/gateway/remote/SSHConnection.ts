export default interface SSHConnection {
    connect(host: string, username: string, password: string): Promise<void>;
    
    execute(command: string): Promise<string>;

    close(): Promise<void>;
}