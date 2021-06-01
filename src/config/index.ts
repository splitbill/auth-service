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
    pg_host: process.env.PGHOST,
    pg_port: process.env.PGPORT,
    pg_user: process.env.PGUSER,
    pg_database: process.env.PGDATABASE,
    pg_password: process.env.PGPASSWORD,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpire: process.env.JWT_EXP,
    jwtRefreshToken: process.env.JWT_REFRESH_TOKEN as string,
    jwtRefreshExpire: process.env.JWT_REFRESH_EXP,
}