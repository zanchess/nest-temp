import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiConfigDto } from './dto/apiConfig.dto';
import { ApiConfigService } from './apiConfig/apiConfig.service';

@ApiTags('Common')
@Controller('common')
@ApiResponse({ type: ApiConfigDto })
export class CommonController {
    constructor(private apiConfigService: ApiConfigService) {}

    @ApiOperation({ summary: 'Получение списка роутов' })
    @Get('endpoints')
    async getApiConfig(): Promise<ApiConfigDto> {
        return this.apiConfigService.getApiConfig();
    }
}
