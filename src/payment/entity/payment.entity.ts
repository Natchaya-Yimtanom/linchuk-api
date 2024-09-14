import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_PAYMENT {
    @PrimaryGeneratedColumn()
    payment_id: number;
  
    @Column()
    receipt_id: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    total_price: number;

    @Column({length: 10})
    pay_type: string;

    @Column()
    pay_img: string;

    @Column('decimal', { precision: 10, scale: 2 })
    cash_receive: number;

    @Column('decimal', { precision: 10, scale: 2 })
    cash_return: number;

    @Column()
    create_on: Date;
  }