import helmet from 'helmet';
import compress from 'compression';
import morganMiddleware from '../middlewares/morgan.middleware';
import { createExpressServer } from "routing-controllers";
import { UserController } from "../services/user/user.controller";
import { useContainer as rcUseContainer } from 'routing-controllers';
import { useContainer as typeOrmUseContainer } from 'typeorm';
import { Container } from 'typedi';
import { AuthController } from "../services/auth/auth.controller";

rcUseContainer(Container);
typeOrmUseContainer(Container);

const app = createExpressServer({
    routePrefix: '/api/v1',
    cors: true,
    controllers: [UserController, AuthController],
    middlewares: [morganMiddleware, helmet]
});

app.use(compress());

export default app;