import { StatusProduct } from '@src/enums/status-product';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @OneToMany(() => Tag, tag => tag.product)
  tags: Tag[];

  @Column('enum', { enum: StatusProduct})
  status: StatusProduct;
}
