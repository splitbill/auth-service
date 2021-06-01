import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import {Service} from "typedi";

@Middleware({ type: 'after' })
@Service()
export class HttpException implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: (err: any) => any) {
        return response.status(error.status || 500)
            .json({
                name   : error.name,
                message: error.message,
                status : error.httpCode,
                stack  : error.stack,
            })
    }
}