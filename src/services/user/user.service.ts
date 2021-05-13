import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Users } from "./user.model";
import { Repository } from "typeorm";

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
}