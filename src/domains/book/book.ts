import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  constructor(name: string = 'testes') {
    this.name = name;
  }


}