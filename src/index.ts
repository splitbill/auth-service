import express from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';

dotenv.config();
const app = express();

/**
 * load middlewares
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * listen to port
 */
app.listen(config.PORT, () => {
    console.log('running')
});