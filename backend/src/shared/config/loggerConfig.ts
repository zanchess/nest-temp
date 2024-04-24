import { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
    pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'debug',
        timestamp: true,
        ...(process.env.MODE === 'local' && {
            transport: {
                target: 'pino-pretty',
                options: {
                    singleLine: true,
                    levelFirst: true,
                    customColors: 'err:red,info:blue,debug:green,warn:yellow',
                },
            },
        }),
    },
};
