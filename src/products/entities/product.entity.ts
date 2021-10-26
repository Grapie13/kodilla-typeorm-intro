import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { TagEntity } from './tag.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    default: 0,
  })
  price: number;

  @Column({
    default: 1,
  })
  count: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToMany(() => TagEntity, (tag) => tag.products)
  @JoinTable({
    name: 'products_tags',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
    },
  })
  tags: TagEntity[];

  static create(opts: ProductOpts) {
    const entity = new ProductEntity();
    entity.name = opts.name;
    entity.price = opts.price;
    entity.count = opts.count;
    entity.tags = opts.tags;

    return entity;
  }
}

interface ProductOpts {
  name: string;
  price: number;
  count: number;
  tags: TagEntity[];
}
