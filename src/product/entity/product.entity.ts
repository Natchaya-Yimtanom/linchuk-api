import { T_PRODUCT_TYPE } from 'src/product_type/entity/product_type.entity';
import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_PRODUCT {
    @PrimaryGeneratedColumn()
    product_id: number;
  
    @Column({ length: 50 })
    product_name: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    product_price: number;

    @Column('decimal', { precision: 10, scale: 2 })
    product_cost: number;

    @Column()
    product_quantity: number;

    @Column()
    product_type_id: number;

    @Column({ length: 1400 })
    product_image: string;

    @Column()
    order_date: Date;

    @Column()
    expire_date: Date;
  }