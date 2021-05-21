import {IsString, Length, IsJWT} from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    @Length(6)
    password:string;
}

export class RefreshTokenDto {
    @IsJWT()
    token: string;
}