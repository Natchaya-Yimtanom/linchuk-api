import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

  @Entity()
  export class T_SWEET {
    @PrimaryGeneratedColumn()
    sweet_id: number;
  
    @Column()
    sweet_num: number;
  
    @Column({ length: 50 })
    sweet_desc: string;
  }