import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class C_UNIT {
    @PrimaryGeneratedColumn()
    unit_id: number;
  
    @Column({ length: 50 })
    unit_name: string;
  
    @Column({ length: 50 })
    unit_name_en: string;
  }