import makeWASocket, { Browsers, DisconnectReason, useMultiFileAuthState, WASocket, AuthenticationState, proto, AnyMessageContent } from '@adiwajshing/baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'
import Handler from './Handler'


const SESSION_PATH = './session/credentials'

export default class Connection {
    private connection?: WASocket
    private handlers: Map<string, Handler<string>> = new Map();

    constructor(
        private readonly state: AuthenticationState,
        private readonly saveCreds: any
    ) { }

    registerHandler(command: string, handler: Handler<string>) {
        this.handlers.set(command, handler)
    }

    private parseMessage(messages: proto.IWebMessageInfo): string {
        return (
            messages.message?.listResponseMessage?.title ??
            messages.message?.extendedTextMessage?.text ??
            messages.message?.ephemeralMessage?.message?.listResponseMessage?.title ??
            messages.message?.ephemeralMessage?.message?.extendedTextMessage?.text ??
            messages.message?.extendedTextMessage?.text ??
            messages.message?.conversation ??
            '!help'
        )
    }

    private findCommand(message: string): string {
        return message.split(' ')[0]
    }

    private findArgs(message: string): string {
        const arr = message.split(' ')
        if (arr.length > 1)
            return message.split(' ').slice(1, arr.length).join(' ')
        return message;
    }

    async handle(message: proto.IWebMessageInfo) {
        const text = this.parseMessage(message);
        const command = this.findCommand(text)
        const args = this.findArgs(text)
        const handler = this.handlers.get(command)
        await this.sendMessage(await handler?.handle(args), message.key.remoteJid!)
    }

    private processSendMessage(message: any): AnyMessageContent {
        if (typeof message === 'string')
            return { text: message }
        return message
    }

    async sendMessage(message: any, to: string) {
        message = this.processSendMessage(message)
        await this.connection?.sendMessage(to, message)
    }

    async initialize() {
        this.connection = makeWASocket({
            auth: this.state,
            browser: Browsers.macOS('Desktop'),
            syncFullHistory: true,
            printQRInTerminal: true,
            logger: pino({ level: 'error' }),
            defaultQueryTimeoutMs: undefined,
        })
        this.connection.ev.on('creds.update', this.saveCreds)
    }

    async start() {
        this.connection?.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update

            if (connection === 'connecting')
                console.log('Inicializando conexão...')

            if (connection === 'open')
                console.log('Conectado!')

            if (connection === 'close' && (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                console.log(`Conexão fechada: ${lastDisconnect?.error}`)
                await this.initialize()
                return
            }
        })

        this.connection?.ev.on('messages.upsert', async m => {
            if (m.messages[0].key.fromMe) return
            try {
                await this.handle(m.messages[0])
            } catch (err) {
                await this.sendMessage(
                    '*[Erro] Ocorreu um erro ao processar a mensagem*',
                    m.messages[0].key.remoteJid!
                )
            }
        })
    }

    static async create() {
        const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH)
        const connection = new Connection(state, saveCreds)
        return connection
    }
}