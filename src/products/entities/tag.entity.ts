import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../enums/tag.enum';
import { ProductEntity } from './product.entity';

@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Tag,
  })
  tag: Tag;

  @ManyToMany(() => ProductEntity, (product) => product.tags)
  products: ProductEntity[];
}
