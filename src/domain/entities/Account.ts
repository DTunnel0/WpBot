class UsernameError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class PasswordError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ConnectionLimitError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ExpirationDateError extends Error {
    constructor(message: string) {
        super(message)
    }
}


class Username {
    private __max_length = 16;
    private __min_length = 3;

    constructor(private readonly _value: string) {
        if (_value.length > this.__max_length)
            throw new UsernameError('Nome de usuario muito grande')


        if (_value.length < this.__min_length)
            throw new UsernameError('Nome de usuario muito pequeno')
    }

    public get value(): string {
        return this._value;
    }
}

class Password {
    private __max_length = 16;
    private __min_length = 3;

    constructor(private readonly _value: string) {
        if (_value.length > this.__max_length)
            throw new PasswordError('Senha muito grande')


        if (_value.length < this.__min_length)
            throw new PasswordError('Senha muito pequena')
    }

    public get value(): string {
        return this._value;
    }
}

class ConnectionLimit {
    constructor(private readonly _value: number) {
        if (_value <= 0) {
            throw new ConnectionLimitError('O limite de conexoes deve ser maior que zero')
        }
    }

    public get value(): number {
        return this._value
    }
}

class ExpirationDate {
    constructor(private readonly _value: Date) {
        if (!(_value instanceof Date))
            throw new ExpirationDateError('Data de expiracao invalida')

        if (_value <= new Date())
            throw new ExpirationDateError('Data de expiracao invalida')
    }

    public get value(): Date {
        return this._value
    }
}

class Account {
    constructor(
        private readonly id: number,
        private readonly username: Username,
        private readonly password: Password,
        private readonly connectionLimit: ConnectionLimit,
        private readonly expirationDate: ExpirationDate,
    ) { }

    public getId(): number {
        return this.id;
    }

    public getUsername(): Username {
        return this.username;
    }

    public getPassword(): Password {
        return this.password;
    }

    public getConnectionLimit(): ConnectionLimit {
        return this.connectionLimit;
    }

    public getExpirationDate(): ExpirationDate {
        return this.expirationDate;
    }
}

export default Account;
export {
    Username, UsernameError,
    Password, PasswordError,
    ConnectionLimit, ConnectionLimitError,
    ExpirationDate, ExpirationDateError,
};