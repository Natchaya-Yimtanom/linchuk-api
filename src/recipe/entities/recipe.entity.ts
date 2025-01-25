import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_RECIPE {
    @PrimaryGeneratedColumn()
    recipe_id: number;

    @Column()
    product_id: number;

    @Column({ length: 50 })
    product_name: string;

    @Column()
    ingredients_id: number;

    @Column({ length: 50 })
    ingredients_name: string;

    @Column()
    amount: number;

    @Column()
    unit_id: number;

    @Column({ length: 50 })
    unit: string;
  }