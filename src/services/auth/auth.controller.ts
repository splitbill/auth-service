import {Inject, Service} from "typedi";
import {Body, Get, JsonController, Post} from "routing-controllers";
import Logger from "../../providers/logger";
import {CreateUserDto} from "./auth.dto";
import {AuthService} from "./auth.service";

@JsonController('/auth')
@Service()
export class AuthController {
    constructor(@Inject() private readonly authService: AuthService) {}

    @Post('/register')
    async register (@Body() createUserDto: CreateUserDto) {
        try {
            return await this.authService.register(createUserDto);
        } catch (err) {
            Logger.error(err);
            return err;
        }
    }
}