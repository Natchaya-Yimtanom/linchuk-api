import { T_ORDER_DETAIL } from 'src/order_detail/entity/order_detail.entity';
import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

  @Entity()
  export class T_ORDER {
    @PrimaryGeneratedColumn()
    order_id: number;
  
    @Column()
    payment_id: number;

    @OneToMany(() => T_ORDER_DETAIL, orderDetail => orderDetail.order)
    orderDetail: T_ORDER_DETAIL[];
  }