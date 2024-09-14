import { T_ORDER } from 'src/order/entity/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_ORDER_DETAIL {
    @PrimaryGeneratedColumn()
    order_detail_id: number;
  
    @Column()
    order_id: number;

    @Column()
    product_id: number;

    @Column()
    sweet_id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => T_ORDER, order => order.orderDetail)
    @JoinColumn({ name: 'order_id' })
    order: T_ORDER;

  }