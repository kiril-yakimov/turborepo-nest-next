import { UserDto } from '@api/modules/user/dtos';
import { Injectable } from '@nestjs/common';
import { KeycloakUserInterface, KeycloakUserAttributesInterface } from '../types';

@Injectable()
export class KeycloakCreateUserBuilderService {
    public build(userDto: UserDto, userId: string): KeycloakUserInterface {
        const attributes: KeycloakUserAttributesInterface = {
            api_user_id: userId,
        } as KeycloakUserAttributesInterface;

        return {
            email: userDto.email,
            enabled: true,
            attributes,
            ...(userDto.password && {
                credentials: [
                    {
                        type: 'password',
                        value: userDto.password,
                        temporary: false,
                    },
                ],
            }),
        } as KeycloakUserInterface;
    }
}
