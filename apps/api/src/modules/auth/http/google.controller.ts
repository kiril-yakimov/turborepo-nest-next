import { Controller } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'nest-keycloak-connect';

@Public()
@ApiExcludeController()
@Controller({
    path: 'auth/google',
    version: '1',
})
export class GoogleController {
    public constructor() {}
}
