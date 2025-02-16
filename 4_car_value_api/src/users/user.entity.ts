import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert() //hooks -> do some action when something happens
  logger() {
    console.log('Inserted User with ID', this.id);
  }

  @AfterRemove()
  logUpdate() {
    console.log('Updated User with ID', this.id);
  }

  @AfterUpdate()
  logRemove() {
    console.log('Removed User with ID', this.id);
  }
}
