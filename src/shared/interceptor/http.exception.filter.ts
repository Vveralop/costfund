import { ArgumentsHost, 
         BadRequestException, Catch, ExceptionFilter, 
         HttpException, InternalServerErrorException, Logger, 
         NotFoundException, RequestTimeoutException } from "@nestjs/common";

@Catch(
    NotFoundException,
    BadRequestException,
    RequestTimeoutException,
    InternalServerErrorException
)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const responseApiBcl =  JSON.parse(JSON.stringify(exception)); 

        Logger.log(responseApiBcl);

        if (typeof(responseApiBcl.response.message) === 'string'){
           response
                    .status(responseApiBcl.status)
                    .json({
                        statusCode: responseApiBcl.status,
                        message: responseApiBcl.message,
                        data: responseApiBcl.message
                    })
        } else {
            response
                .status(status)
                .json({
                    statusCode: status,
                    message: responseApiBcl.response.message.toString(),
                    data: responseApiBcl.response.message.toString()
                })
        }
    }
}
