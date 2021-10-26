import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repositories/products.repository';
import { TagsRepository } from '../repositories/tags.repository';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly tagsRepository: TagsRepository,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productsRepository.find();

    return products.map((product) => ProductDto.fromEntity(product));
  }

  async getProductById(id: string): Promise<ProductDto> {
    const product = await this.productsRepository.findOneById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return ProductDto.fromEntity(product);
  }

  async addProduct(productDto: CreateProductDto): Promise<ProductDto> {
    const tags = await this.tagsRepository.findTagsByNames(productDto.tags);
    const product = ProductEntity.create({
      name: productDto.name,
      price: productDto.price,
      count: productDto.count,
      tags,
    });
    await this.productsRepository.save(product);

    return ProductDto.fromEntity(product);
  }

  async updateProduct(
    id: string,
    productDto: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = await this.productsRepository.findOneById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    const tags = await this.tagsRepository.findTagsByNames(productDto.tags);
    product.name = productDto.name ?? product.name;
    product.price = productDto.price ?? product.price;
    product.count = productDto.count ?? product.count;
    product.tags = tags.length > 0 ? tags : product.tags;
    await this.productsRepository.save(product);

    return ProductDto.fromEntity(product);
  }

  async deleteProduct(id: string): Promise<ProductDto> {
    const product = await this.productsRepository.findOneById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    await this.productsRepository.remove(product);

    return ProductDto.fromEntity(product);
  }
}
