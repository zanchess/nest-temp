import { Injectable, RequestMethod } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ApiConfigDto, MethodConfig } from '../dto/apiConfig.dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ApiConfigService {
    private restApiMethods = new Map([
        [RequestMethod.GET, 'GET'],
        [RequestMethod.POST, 'POST'],
        [RequestMethod.PUT, 'PUT'],
        [RequestMethod.DELETE, 'DELETE'],
        [RequestMethod.PATCH, 'PATCH'],
    ]);
    private apiPrefix = '/api/v1';
    private excludedModules = ['Root'];

    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly logger: Logger,
    ) {}

    private async mapControllerMethods(methods: string[], controller: InstanceWrapper): Promise<MethodConfig[]> {
        return methods.map((methodName) => {
            const requestPath = Reflect.getMetadata('path', controller.instance[methodName]);
            const requestMethod = Reflect.getMetadata('method', controller.instance[methodName]);
            const title = Reflect.getMetadata('swagger/apiOperation', controller.instance[methodName]);
            const roles = Reflect.getMetadata('roles', controller.instance[methodName]);
            const needAuth = Reflect.getMetadata('needAuth', controller.instance[methodName]);

            const a = {
                title: title?.summary ?? null,
                path: requestPath,
                requestMethod: this.restApiMethods.get(requestMethod),
                needAuth: needAuth ?? false,
                roles: roles ?? [],
            };

            this.logger.log('Мой лог');

            return a;
        });
    }
    async getApiConfig(): Promise<ApiConfigDto> {
        const results = [];
        const controllers = this.discoveryService.getControllers();

        for (const controller of controllers) {
            const controllerTitle = Reflect.getMetadata('swagger/apiUseTags', controller.instance.constructor)?.[0];

            if (!this.excludedModules.includes(controllerTitle)) {
                const methodsList = this.metadataScanner.getAllMethodNames(controller.instance);
                const controllerPath = Reflect.getMetadata('path', controller.instance.constructor);
                const needAuth = Reflect.getMetadata('needAuth', controller.instance.constructor);
                const mappedMethodList = await this.mapControllerMethods(methodsList, controller);

                results.push({
                    title: controllerTitle ?? null,
                    needAuth: needAuth ?? false,
                    path: `${this.apiPrefix}/${controllerPath}`,
                    methods: mappedMethodList,
                });
            }
        }

        return {
            modules: results,
        };
    }
}
