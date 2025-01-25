import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_INGREDIENTS {
    @PrimaryGeneratedColumn()
    ingredients_id: number;

    @Column({ length: 50 })
    ingredients_type: string;
  
    @Column({ length: 50 })
    ingredients_name: string;
  
    @Column()
    unit_id: number;

    @Column()
    unit_name: string;

    @Column()
    order_amount: number;

    @Column()
    remain: number;

    @Column({ length: 20 })
    lot_number: string;

    @Column()
    order_date: Date;

    @Column()
    expire_date: Date;
  }