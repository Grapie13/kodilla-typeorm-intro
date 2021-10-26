import { Tag } from '../enums/tag.enum';
import { IsArray, IsDate, IsInt, IsString } from 'class-validator';
import { ProductEntity } from '../entities/product.entity';
import { plainToClass } from 'class-transformer';

export class ProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsInt()
  count: number;

  @IsArray()
  tags: Tag[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  static fromEntity(entity: ProductEntity) {
    const result = plainToClass(ProductDto, entity);

    return result;
  }
}
