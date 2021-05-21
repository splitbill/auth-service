import {Inject, Service} from "typedi";
import {Body, JsonController, Post} from "routing-controllers";
import Logger from "../../providers/logger";
import {CreateUserDto, RefreshTokenDto, LoginDto} from "./auth.dto";
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

    @Post('/refresh')
    async refresh (@Body() refreshTokenDto: RefreshTokenDto) {
        try {
            return await this.authService.refresh(refreshTokenDto);
        } catch (err) {
            Logger.error(`Refresh ${err.message}`);
            throw err;
        }
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        try {
            return await this.authService.login(loginDto);
        } catch (err) {
            throw err;
        }
    }
}