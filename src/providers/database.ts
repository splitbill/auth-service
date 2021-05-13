import {createConnection } from "typeorm";
import config from '../config'
import {Users} from "../services/user/user.model";
import Logger from "./logger";

const createDB = async () => {
    try {
        // @ts-ignore
        await createConnection({
            type: "postgres",
            host: config.pg_host,
            // @ts-ignore
            port: config.pg_port,
            username: config.pg_user,
            database: config.pg_database,
            entities: [Users]
        });
    } catch (err) {
        Logger.error('error!', err);
    }
}

export {
    createDB,
}
