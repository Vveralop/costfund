import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    @Get()
    @ApiOperation({
      summary: 'Check to see if the API BCL server is running.',
    })    
    @HttpCode(200)
    healthcheck(): string {
      return "Server BCL it's running ok.";
    }
}
