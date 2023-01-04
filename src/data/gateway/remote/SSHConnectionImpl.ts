import { Client } from "ssh2";
import SSHConnection from "./SSHConnection";

export default class SSHConnectionImpl implements SSHConnection {
    constructor(private readonly connection: Client = new Client()) { }

    async connect(host: string, username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.on('ready', () => {
                resolve();
            }).on('error', (err) => {
                reject(err);
            }).connect({
                host,
                username,
                password
            });
        });
    }

    async execute(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.connection.exec(command, (err, stream) => {
                if (err) {
                    reject(err);
                } else {
                    let output = '';
                    stream.on('close', (code: any, signal: any) => {
                        resolve(output);
                    }).on('data', (data: string) => {
                        output += data;
                    }).stderr.on('data', (data) => {
                        reject(new Error(data));
                    });
                }
            });
        });
    }

    async close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end();
            this.connection.on('end', () => {
                resolve();
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
}
