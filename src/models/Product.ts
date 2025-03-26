import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import { Stock } from './Stock';
import { Invoice } from './Invoice';

@Entity()
export class Product {

  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column('int')
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cost!: number;

  @OneToMany(()=> Stock, (stock)=> stock.product)
  stockEntries!: Stock[];

  @OneToMany(()=> Invoice, (invoice)=> invoice.product)
  invoices!: Invoice[];
}

