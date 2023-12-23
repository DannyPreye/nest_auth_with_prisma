/* eslint-disable prettier/prettier */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService
{
    constructor (private readonly userService: UserService, private jwtService: JwtService) { }


    async login(dto: LoginDTO)
    {
        const user = await this.validateUser(dto);

        const payload = { email: user.email, sub: user.name };

        return {
            user,
            backend_tokens: {
                access_token: await this.jwtService.signAsync(payload, { expiresIn: '20s', secret: process.env.JWT_SECRET }),
                refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '7d', secret: process.env.JWT_REFRESH_TOKEN }),
            }
        };
    }

    async validateUser(dto: LoginDTO)
    {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await compare(dto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result;

    }

    async refreshToken(user: any)
    {
        const payload = {
            email: user.email,
            sub: {
                name: user.sub
            }
        };

        return {
            access_token: await this.jwtService.signAsync(payload, { expiresIn: '20s', secret: process.env.JWT_SECRET }),
            refresh_token: await this.jwtService.signAsync(payload, { expiresIn: '7d', secret: process.env.JWT_REFRESH_TOKEN }),
        };
    }
}
