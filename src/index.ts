import app from "./providers/express";
import * as database from './providers/database';
import config from "./config";
import Logger from "./providers/logger";

/**
 * load database
 */
(async () => await database.createTables())();

app.listen(config.PORT, () => {
    Logger.debug(`Server is up and running @ http://localhost:${config.PORT}`);
});
