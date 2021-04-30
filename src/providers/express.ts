import express, {NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compress from 'compression';
import { query } from "./database";
import morganMiddleware from "../middlewares/morgan.middleware";
import Logger from "./logger";
import httpStatus from 'http-status';
import {router} from "../api/v1";

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(morganMiddleware);

app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const result = await query('SELECT NOW()');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error(`API not Found`);
    res.status(httpStatus.NOT_FOUND);
    return next(err);
});

app.get("/logger", (_, res) => {
    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");
    res.send("Hello world");
});



export default app;