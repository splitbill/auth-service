import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Users } from "./user.model";
import { Repository } from "typeorm";
import Logger from "../../providers/logger";
import {CreateUserDto} from "../auth/auth.dto";

@Service()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const user = Object.assign(new Users(), createUserDto);
            return await this.userRepository.save(user);
        } catch (err) {
            Logger.error(err);
            throw new err;
        }
    }
}