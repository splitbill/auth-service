import app from "./providers/express";
import config from "./config";
import Logger from "./providers/logger";

app.listen(config.PORT, () => {
    Logger.debug(`Server is up and running @ http://localhost:${config.PORT}`);
});
