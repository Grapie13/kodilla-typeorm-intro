import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { RoleGuard } from '../../shared/guards/role.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    const products = this.productsService.getAllProducts();

    return products;
  }

  @Get('/:id')
  getProductById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const product = this.productsService.getProductById(id);

    return product;
  }

  @UseGuards(RoleGuard)
  @Post('')
  createProduct(@Body() productDto: CreateProductDto) {
    const product = this.productsService.addProduct(productDto);

    return product;
  }

  @UseGuards(RoleGuard)
  @Patch('/:id')
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() productDto: UpdateProductDto,
  ) {
    const product = this.productsService.updateProduct(id, productDto);

    return product;
  }

  @Delete('/:id')
  deleteProduct(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const product = this.productsService.deleteProduct(id);

    return product;
  }
}
