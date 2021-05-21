import {Inject, Service} from "typedi";
import jwt from 'jsonwebtoken';
import {SignOptions} from "jsonwebtoken";
import config from '../../config';
import {CreateUserDto} from "./auth.dto";
import {UserService} from "../user/user.service";
import {Users} from "../user/user.model";
import {setAsync} from "../../providers/redis";

@Service()
export class AuthService {
    constructor(@Inject() private readonly userService: UserService) {}

    async generateAccessToken(userId: string) {
      try {
          const payload = { userId };
          const options: SignOptions = { expiresIn: config.jwtExpire };
          return jwt.sign(payload, config.jwtSecret, options);
      } catch (err) {
          throw new err;
      }
    }

    async generateRefreshToken(userId: string) {
        try {
            const payload = { userId };
            const options: SignOptions = { expiresIn: config.jwtRefreshToken };
            const refresh = jwt.sign(payload, config.jwtRefreshToken, options);
            await setAsync(userId, refresh);
            return refresh;
        } catch (err) {
            throw new err;
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
            throw new err;
        }
    }
}