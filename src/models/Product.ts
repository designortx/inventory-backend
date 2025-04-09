import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import { Stock } from './Stock';
import { Invoice } from './Invoice';
import { Units } from './Units';
import { PricingList } from './PricingList';
import { BuyingUnits } from './BuyingUnits';
import { SellingUnits } from './SelingUnits';

@Entity()
export class Product {

  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  stockingUnit!: string;

  /**
   * @deprecated unitPrice is deprecated and will be replaced with PricingList entity
   */
  @Column('decimal')
  unitPrice!: number;

  @OneToMany(()=> Stock, (stock)=> stock.product)
  stockEntries!: Stock[];

  @OneToMany(()=> Invoice, (invoice)=> invoice.product)
  invoices!: Invoice[];

  @ManyToOne(()=> BuyingUnits, (units)=> units)
  /**
   * This attribute holds the id of the buying units (Units entity)
   */
  buyingUnits!: BuyingUnits;

  @ManyToOne(()=> SellingUnits, (units)=> units)
  /**
   * This attribute holds the id of the buying units (Units entity)
   */
  sellingUnits!: SellingUnits;

  @ManyToOne(()=> PricingList, (pricingList)=> pricingList.products)
  pricingList!: PricingList;
}

