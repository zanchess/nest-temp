import { ApiProperty } from '@nestjs/swagger';

export class IActionResponse<T = NonNullable<unknown>> {
    @ApiProperty({
        title: 'Статус действия',
        description: 'Статус действия',
        default: 'success',
        type: String,
    })
    status: string;

    @ApiProperty({
        title: 'Сообщение',
        description: 'Сообщение',
        default: '',
        type: String,
    })
    message: string;

    @ApiProperty({
        title: 'Сообщение',
        description: 'Сообщение',
        default: '',
        type: String,
    })
    type?: 'form' | 'notification' | 'common';

    @ApiProperty({
        title: 'Результат',
        description: 'Данные',
        type: Object,
    })
    result?: T;
}
