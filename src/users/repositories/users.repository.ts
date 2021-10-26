import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  findOneById(id: string) {
    return this.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }
}
