/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController
{
    constructor (private readonly userService: UserService) { }


    @UseGuards(JWTGuard)
    @Get(':id')
    async getUserProfile(@Param('id') id: number)
    {
        const user = await this.userService.findById(id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
    }
}
