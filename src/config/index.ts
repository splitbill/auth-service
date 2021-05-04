import * as dotenv from "dotenv";
import path from "path";
import Logger from "../providers/logger";

const result = dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (result.error) {
    Logger.error(result.error);
    throw result.error
}

export default {
    env: process.env.NODE_ENV,
    PORT: process.env.PORT,
    redis_host: process.env.RSHOST,
    redis_port: Number(process.env.RSPORT),
}