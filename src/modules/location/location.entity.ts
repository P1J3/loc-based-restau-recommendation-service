import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// 시군구 정보
@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doSi: string;

  @Column()
  sgg: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
