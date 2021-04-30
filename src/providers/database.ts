import { Pool } from 'pg';
import Logger from "./logger";

const pool = new Pool();

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    Logger.error('Unexpected error on idle client', err);
    process.exit(-1)
});

const query = (text: string, params?: any) => {
    return pool.query(text, params)
};

export {
    query
}