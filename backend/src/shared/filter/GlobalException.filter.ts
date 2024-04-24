import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        const responseObject = {
            statusCode: status,
            message: message,
        };

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            responseObject['error'] = exception.message;
        }

        response.status(status).json(responseObject);
    }
}
