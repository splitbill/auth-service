import 'reflect-metadata';
import app from "./providers/express";
import * as database from './providers/database';
import config from "./config";
import Logger from "./providers/logger";
/**
 * load database
 */
(async () =>  {
    try {
        await database.createDB();
        Logger.info('database is connected!');
    } catch (err) {
        Logger.error(`Database err: ${err}`);
    }
})();

app.listen(config.PORT, () => {
    Logger.debug(`Server is up and running @ http://localhost:${config.PORT}`);
});
