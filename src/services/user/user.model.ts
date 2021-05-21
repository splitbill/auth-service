import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";
import bcrypt from 'bcrypt';


@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // todo: fix created at
    @Column({ name: 'createdat' })
    createdAt: Date;

    @BeforeInsert()
    async hashPass() {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        this.password = await bcrypt.hash(this.password, salt);
    }
    //todo: implement compare password
}