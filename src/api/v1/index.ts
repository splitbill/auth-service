import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/status',(req:Request, res:Response) => res.send('ok'))

export {
    router
}