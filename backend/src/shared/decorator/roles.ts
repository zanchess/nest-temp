import { SetMetadata } from '@nestjs/common';
import { EDefaultRoleName } from '../enum/EDefaultRole.enum';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: EDefaultRoleName[]) => SetMetadata('roles', roles);
