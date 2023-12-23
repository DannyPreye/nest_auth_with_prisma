/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from "bcrypt";



@Injectable()
export class UserService
{
    constructor (private prisma: PrismaService) { }
    async create(createUserdto: CreateUserDto)
    {
        const user = await this.prisma.user.findUnique(
            {
                where: {
                    email: createUserdto.email
                }
            }
        );

        if (user) {
            throw new ConflictException('User already exists');
        }

        const newUser = await this.prisma.user.create(
            {
                data: {
                    ...createUserdto,
                    password: await hash(createUserdto.password, 10)
                }
            }
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = newUser;

        return result;
    }
    async findByEmail(email: string)
    {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });




        return user;
    }
    async findById(id: number)
    {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });




        return user;
    }
    async findAll() { }
    async update() { }
    async remove() { }
}
