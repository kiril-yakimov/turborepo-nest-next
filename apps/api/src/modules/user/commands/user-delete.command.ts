import { ICommand } from '@nestjs/cqrs';

export class UserDeleteCommand implements ICommand {
    public constructor(public readonly id: string) {}
}
