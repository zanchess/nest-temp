import * as Joi from 'joi';
import j2s from 'joi-to-swagger';

export class PaginationResponseDto {
    static getPaginationResponseSchema(dto: any): Joi.ObjectSchema {
        return Joi.object({
            data: Joi.array().items(dto.validationSchema),
            totalCount: Joi.number(),
        });
    }

    static getSwaggerSchema(dto: any): object {
        return j2s(PaginationResponseDto.getPaginationResponseSchema(dto)).swagger;
    }
}
