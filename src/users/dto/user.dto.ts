import { IsDate, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsDate()
  birthday: Date;

  static fromEntity(entity: UserEntity) {
    const result = plainToClass(UserDto, entity);

    return result;
  }
}
