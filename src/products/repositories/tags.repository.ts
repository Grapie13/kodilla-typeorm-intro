import { EntityRepository, In, Repository } from 'typeorm';
import { TagEntity } from '../entities/tag.entity';

@EntityRepository(TagEntity)
export class TagsRepository extends Repository<TagEntity> {
  findTagsByNames(names: string[] = []) {
    return this.find({
      where: { tag: In(names) },
    });
  }
}
