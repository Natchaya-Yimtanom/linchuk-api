import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_PROMOTION {
    @PrimaryGeneratedColumn()
    promotion_id: number;
  
    @Column({ length: 100 })
    promotion_name: string;
  
    @Column()
    discount_amount: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    product_id: number;
  }