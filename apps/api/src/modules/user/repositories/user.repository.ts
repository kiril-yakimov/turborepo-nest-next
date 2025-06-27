import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../entites/user.entity';

export class UserRepository extends EntityRepository<User> {}
