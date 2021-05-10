import { createConnection, getConnectionManager } from "typeorm";
import config from '../config'
import {User} from "../services/user/user.model";

const connectionManager = getConnectionManager();
const createDB = async () => {
    // @ts-ignore
    const connection = connectionManager.create({
        type: "postgres",
        host: config.pg_host,
        // @ts-ignore
        port: config.pg_port,
        username: config.pg_user,
        password: config.pg_password,
        database: config.pg_database,
        entities: [User]
    });
    return await connection.connect();
}

export {
    createDB,
}
