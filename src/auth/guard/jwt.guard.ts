/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Injectable()
export class JWTGuard implements CanActivate
{
    constructor (private jwtService: JwtService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean>
    {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,

            });

            request.user = payload;



        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;


    }

    private extractTokenFromHeader(request: Request)
    {
        const authorization = request.headers.authorization.toString();

        if (!authorization) {
            return undefined;
        }

        console.log(authorization.includes("Bearer"));
        const token = authorization?.slice(7);

        if (authorization.includes("Bearer")) {
            return token;
        }

        return undefined;

    }
}
