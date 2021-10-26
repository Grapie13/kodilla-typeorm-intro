import { Tag } from '../enums/tag.enum';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  count: number;

  @IsEnum(Tag, { each: true })
  @IsNotEmpty()
  tags: Tag[];
}
