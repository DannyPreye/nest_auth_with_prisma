/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Injectable()
export class RefreshJWTGuard implements CanActivate
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
                secret: process.env.JWT_REFRESH_TOKEN,

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


        const token = authorization?.slice(8);

        if (authorization.includes("Refresh")) {
            return token;
        }

        return undefined;

    }
}
