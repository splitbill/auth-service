import {Inject, Service} from "typedi";
import {Body, Get, JsonController, Post} from "routing-controllers";
import {UserService} from "../user/user.service";
import Logger from "../../providers/logger";
import {CreateUserDto} from "./auth.dto";

@JsonController('/auth')
@Service()
export class AuthController {
    constructor(@Inject() private readonly userService: UserService) {}

    @Post('/register')
    async register (@Body() createUserDto: CreateUserDto) {
        try {
            return await this.userService.create(createUserDto);
        } catch (err) {
            Logger.error(err);
            return err;
        }
    }
}