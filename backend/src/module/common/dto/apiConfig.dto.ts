import { ApiProperty } from '@nestjs/swagger';

export class MethodConfig {
    @ApiProperty({ description: 'Название эндпоинта', example: 'Login по email' })
    title: string | null;

    @ApiProperty({ description: 'path эндпоинта', example: 'login' })
    path: string;

    @ApiProperty({ description: 'Метод запроса', example: 'POST' })
    requestMethod: string;

    @ApiProperty({
        description: 'Нужна ли авторизация для доступа к методу',
        example: false,
    })
    needAuth: boolean;

    @ApiProperty({
        description: 'Роли, которым разрешен доступ к методу',
        example: ['ADMIN', 'USER'],
    })
    roles: string[];
}

class ModuleDto {
    @ApiProperty({ description: 'Название модуля', example: 'Authorization' })
    title: string | null;

    @ApiProperty({ description: 'Path модуля', example: '/api/v1/auth' })
    path: string;

    @ApiProperty({
        description: 'Нужна ли авторизация для доступа к модулю',
        example: false,
    })
    needAuth: boolean;

    @ApiProperty({ description: 'Список методов', type: [MethodConfig] })
    methods: MethodConfig[];
}

export class ApiConfigDto {
    @ApiProperty({ description: 'Список модулей', type: [ModuleDto] })
    modules: ModuleDto[];
}
