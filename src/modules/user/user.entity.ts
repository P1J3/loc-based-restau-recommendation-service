import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // PRIMARY KEY, AUTO_INCREMENT 
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  isCommend: number;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  lon: string;

  @CreateDateColumn()  // 자동으로 날짜 삽입
  createdAt: Date;

  @UpdateDateColumn()  // 자동으로 업데이트 날짜 삽입
  updatedAt: Date;
}
