import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_RECEIPT {
    @PrimaryGeneratedColumn()
    receipt_id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    create_on: Date;

    @Column()
    receipt_number: string;
  }