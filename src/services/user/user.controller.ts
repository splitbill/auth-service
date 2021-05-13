import {UserService} from "./user.service";
import {Controller, Get} from "routing-controllers";
import {Service} from "typedi";

@Controller()
@Service()
export class UserController {
   constructor(private readonly userService: UserService) {}
    @Get('/users')
     async find() {
        return await this.userService.findUser();
    }
}