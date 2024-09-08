import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

  @Entity()
  export class T_PRODUCT_TYPE {
    @PrimaryGeneratedColumn()
    product_type_id: number;
  
    @Column({ length: 50 })
    product_type: string;
  }