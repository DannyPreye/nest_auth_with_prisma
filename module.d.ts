/* eslint-disable prettier/prettier */
declare namespace NodeJS
{
    export interface ProcessEnv
    {
        NODE_ENV: 'development' | 'production' | 'test';
        DATABASE_URL: string;
        JWT_SECRET: string;
        JWT_REFRESH_TOKEN: string;
    }
}
