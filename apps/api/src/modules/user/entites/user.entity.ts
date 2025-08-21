import { Timestamp } from '@api/shared/entites/timestamp.entity';
import { Entity, EntityRepositoryType, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { UserStatus } from '../enums/user-status.enum';
import { UserRepository } from '../repositories/user.repository';

@Entity({
    tableName: 'users',
    repository: () => UserRepository,
})
export class User extends Timestamp {
    [EntityRepositoryType]?: UserRepository;

    @PrimaryKey()
    id: string = uuidv4();

    @Property({ index: true })
    externalAuthId: string;

    @Enum({
        items: () => UserStatus,
        default: UserStatus.ACTIVE,
        nullable: false,
        index: true,
    })
    status: UserStatus = UserStatus.ACTIVE;
}
