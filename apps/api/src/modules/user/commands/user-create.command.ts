import { ICommand } from '@nestjs/cqrs';
import { UserDto } from '../dtos';

export class UserCreateCommand implements ICommand {
    public constructor(public readonly userDto: UserDto) {}
}
