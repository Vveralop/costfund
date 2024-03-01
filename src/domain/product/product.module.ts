import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.entity';
import { CreateProductService } from './service';
import { CreateProductController } from 'src/adapter/controllers/product';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [CreateProductService],
  controllers: [CreateProductController],
})
export class ProductModule {}
