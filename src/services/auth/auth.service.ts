import {Inject, Service} from "typedi";
import jwt from 'jsonwebtoken';
import {SignOptions} from "jsonwebtoken";
import createHttpError from "http-errors";
import config from '../../config';
import {CreateUserDto, RefreshTokenDto} from "./auth.dto";
import {UserService} from "../user/user.service";
import {Users} from "../user/user.model";
import {getAsync, setAsync} from "../../providers/redis";

@Service()
export class AuthService {
    constructor(@Inject() private readonly userService: UserService) {}

    async generateAccessToken(userId: string) {
      try {
          const payload = { userId };
          const options: SignOptions = { expiresIn: config.jwtExpire };
          return jwt.sign(payload, config.jwtSecret, options);
      } catch (err) {
          throw err;
      }
    }

    async generateRefreshToken(userId: string) {
        try {
            const payload = { userId };
            const options: SignOptions = { expiresIn: config.jwtRefreshToken };
            const refresh = await jwt.sign(payload, config.jwtRefreshToken, options);
            await setAsync(userId, refresh);
            return refresh;
        } catch (err) {
            throw err;
        }
    }

    async register(createUserDto: CreateUserDto) {
        try {
            const newUser: Users = await this.userService.create(createUserDto);
            return {
                refresh: await this.generateRefreshToken(String(newUser.id)),
                token: await this.generateAccessToken(String(newUser.id)),
            };
        } catch (err) {
            throw err;
        }
    }

    async refresh(refreshTokenDto: RefreshTokenDto) {
        //todo: refactor
        try {
            // check token is valid
            const validate = await jwt.verify(refreshTokenDto.token, config.jwtRefreshToken);
            if (!validate) {
                return new createHttpError.Unauthorized();
            }
            // check token inside redis database
            const decoded: any = await jwt.decode(refreshTokenDto.token);
            if (decoded && decoded.userId) {
                const activeRefreshToken = await getAsync(decoded.userId);
                if (activeRefreshToken === refreshTokenDto.token) {
                    // return new access token and refresh token
                    return {
                        refresh: await this.generateRefreshToken(String(decoded.userId)),
                        token: await this.generateAccessToken(String(decoded.userId)),
                    }
                } else {
                    return new createHttpError.Unauthorized();
                }
            } else {
                return new createHttpError.Unauthorized();
            }
        } catch (err) {
            throw err;
        }
    }
}