import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'loandepo_configuration' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
