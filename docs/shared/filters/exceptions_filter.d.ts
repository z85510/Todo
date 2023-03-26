import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class CustomExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost): void;
}
