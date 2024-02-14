import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../model/product.entity';
import { CreateProductInput } from '../dto/createProduct.dto';

@Injectable()
export class CreateProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  createProduct(body: CreateProductInput) {
    return this.productRepository.save(body);
  }
}
