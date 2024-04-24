import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { ApiConfigService } from './apiConfig/apiConfig.service';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';

@Module({
    imports: [],
    controllers: [CommonController],
    providers: [ApiConfigService, MetadataScanner, DiscoveryService, Object],
    exports: [],
})
export class CommonModule {}
