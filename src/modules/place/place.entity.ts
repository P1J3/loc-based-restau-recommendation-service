import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn() // PRIMARY KEY, AUTO_INCREMENT
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column()
  address: string;

  @Column()
  average: number;

  @Column({ type: 'double' })
  locationId: number;

  @CreateDateColumn() // 자동으로 날짜 삽입
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
