/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJWTGuard } from './guard/refresh.guard';

@Controller('auth')
export class AuthController
{
    constructor (private userService: UserService, private authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: LoginDTO)
    {
        return this.authService.login(dto);
    }

    @Post('register')
    async register(@Body() user: CreateUserDto)
    {
        return this.userService.create(user);
    }

    @UseGuards(RefreshJWTGuard)
    @Post('refresh')
    async refreshToken(@Request() req)
    {
        return this.authService.refreshToken(req.user);


    }
}
