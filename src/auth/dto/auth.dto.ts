/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO
{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;
}
