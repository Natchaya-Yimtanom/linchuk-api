import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';

  @Entity()
  export class T_USER {
    @PrimaryGeneratedColumn()
    user_id: number;
  
    @Column({ length: 10 })
    uuid: string;

    @Column({ length: 50 })
    firstname: string;

    @Column({ length: 50 })
    lastname: string;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 10 })
    role: string;

    @Column({ length: 1400 })
    image: string;

    @Column()
    create_on: Date;

    @Column()
    update_on: Date;

    @Column()
    last_login: Date;
  }