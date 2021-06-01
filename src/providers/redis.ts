import Redis from 'redis';
import { promisify } from 'util';
import config from '../config';

const client =  Redis.createClient({
    host: config.redis_host,
    port: config.redis_port,
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client)
const quitAsync = promisify(client.quit).bind(client);
const rPushAsync = promisify(client.rpushx).bind(client);
const rDelAsync = promisify<(string)>(client.del).bind(client);

client.on("error", function(error) {
    console.error('redis error:', error);
});

export {
    client,
    getAsync,
    setAsync,
    quitAsync,
    rPushAsync,
    rDelAsync,
}