import { IQuery } from '@nestjs/cqrs';

export class GetUserQuery implements IQuery {
    public constructor(public readonly id: string) {}
}
