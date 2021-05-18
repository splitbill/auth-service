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
    ) {
    }
    findUser() {
        return this.userRepository.find();
    }

    async create(createUserDto: CreateUserDto) {
        try {
            return this.userRepository.insert(createUserDto);
        } catch (err) {
            Logger.error(err);
            return err;
        }
    }
}