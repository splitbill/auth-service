import {Inject, Service} from "typedi";
import jwt from 'jsonwebtoken';
import config from '../../config';
import {SignOptions} from "jsonwebtoken";
import {CreateUserDto} from "./auth.dto";
import {UserService} from "../user/user.service";
import {InsertResult} from "typeorm";

@Service()
export class AuthService {
    constructor(@Inject() private readonly userService: UserService) {}

    async createToken(userId: String) {
        const payload = { userId };
        const options: SignOptions = { expiresIn: config.jwtExpire };
        return jwt.sign(payload, config.jwtSecret, options);
    }

    async register(createUserDto: CreateUserDto) {
        try {
            //todo: hash password
            //todo: add refresh token
            const newUser: InsertResult = await this.userService.create(createUserDto);
            return {
                token: await this.createToken(newUser.identifiers[0].id),
            };
        } catch (err) {
            return err;
        }
    }
}