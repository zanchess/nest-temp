import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './shared/pipe/CustomValidationPipe';
import { CommonModule } from './module/common/common.module';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './shared/config/loggerConfig';

@Module({
    imports: [
        LoggerModule.forRootAsync({
            useFactory: async () => loggerConfig,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CommonModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: CustomValidationPipe,
        },
    ],
})
export class AppModule {}
