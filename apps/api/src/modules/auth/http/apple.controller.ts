import { Controller } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

@Public()
@ApiExcludeController()
@Controller({
    path: 'auth/apple',
    version: '1',
})
export class AppleController {
    public constructor() {}
}
