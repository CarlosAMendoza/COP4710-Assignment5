import {Connection, createConnection, ConnectionConfig} from 'mysql'


export const config: ConnectionConfig = {
    host: 'localhost',
    user: 'node',
    database: 'HenryBooks',
    password: 'node@1234'
}

export const connect = createConnection(config)
