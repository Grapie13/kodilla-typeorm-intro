import { Tag } from '../enums/tag.enum';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MaxLength(25)
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  count?: number;

  @IsEnum(Tag, { each: true })
  @IsOptional()
  tags?: Tag[];
}
