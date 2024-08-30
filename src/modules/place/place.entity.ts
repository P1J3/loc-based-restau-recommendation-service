import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true }) // PRIMARY KEY, AUTO_INCREMENT
  id: bigint;

  @Column()
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @Column()
  address: string;

  @Column({ type: 'double', nullable: true })
  average: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
