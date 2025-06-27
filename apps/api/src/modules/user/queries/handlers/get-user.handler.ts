import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UserRoDto } from '../../dtos';
import { UserRepository } from '../../repositories/user.repository';
import { GetUserQuery } from '../get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    public constructor(private readonly userRepository: UserRepository) {}

    public async execute(query: GetUserQuery): Promise<UserRoDto> {
        const { id } = query;

        const user = await this.userRepository.findOneOrFail({ id });

        return plainToInstance(UserRoDto, user, { excludeExtraneousValues: true });
    }
}
