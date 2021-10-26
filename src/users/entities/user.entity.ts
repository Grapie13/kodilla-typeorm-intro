import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({
    type: 'timestamp',
  })
  birthday: Date;

  static create(opts: UserOpts) {
    const entity = new UserEntity();
    entity.firstName = opts.firstName;
    entity.lastName = opts.lastName;
    entity.email = opts.email;
    entity.birthday = new Date(opts.birthday);

    return entity;
  }
}

interface UserOpts {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}
