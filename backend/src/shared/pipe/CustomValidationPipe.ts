import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { errorMessages } from './errorMessages';
import { ValidationException } from '../exeptions/HttpErrorException';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.metatype && (metadata.metatype as any).validationSchema) {
            const { error } = (metadata.metatype as any).validationSchema.validate(value, { abortEarly: false });

            const errors = error?.details?.reduce((object, value) => {
                return {
                    ...object,
                    [`${value.path}`]: errorMessages[value.type] ?? value.message.replace(/"/g, `'`),
                };
            }, {});

            if (errors) {
                throw new ValidationException(errors);
            }
        }

        return value;
    }
}
