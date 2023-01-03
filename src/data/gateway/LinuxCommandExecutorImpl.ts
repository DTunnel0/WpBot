import { exec } from 'child_process';
import LinuxCommandExecutor from './LinuxCommandExecutor';

export default class LinuxCommandExecutorImpl implements LinuxCommandExecutor {
    execute(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(stdout);
            });
        });
    }
}