import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm';
import { Stock } from './Stock';
import { Invoice } from './Invoice';
import { Units } from './Units';
import { PricingList } from './PricingList';
import { BuyingUnits } from './BuyingUnits';
import { SellingUnits } from './SelingUnits';
import { AppDataSource } from '../data-source';

interface ProductInterface {
  id: string;
  name: string;
  stockingUnit: string;
  unitPrice: number;
  stockEntries: Stock[] | undefined;
  invoices: Invoice[] | undefined;
  pricingList: PricingList,
  buyingUnits: BuyingUnits | number;
  sellingUnits: SellingUnits | number;
}

export class ProductJson {
  constructor(product: ProductInterface) {
    this.id = product.id;
    this.name = product.name;
    this.stockingUnit = product.stockingUnit;
    this.unitPrice = product.unitPrice;
    this.stockEntries = product.stockEntries;
    this.invoices = product.invoices;
    this.pricingList = product.pricingList;
    this.buyingUnits = product.buyingUnits;
    this.sellingUnits = product.sellingUnits;
  }
  id: string;
  name: string;
  stockingUnit: string;
  unitPrice: number;
  stockEntries: Stock[] | undefined;
  invoices: Invoice[] | undefined;
  pricingList: PricingList;
  buyingUnits: BuyingUnits | number;
  sellingUnits: SellingUnits | number;
}

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

  @ManyToOne(()=> BuyingUnits, (units)=> units.id)
  /**
   * This attribute holds the id of the buying units (Units entity)
   */
  buyingUnits!: number;

  @ManyToOne(()=> SellingUnits, (units)=> units.id)
  /**
   * This attribute holds the id of the buying units (Units entity)
   */
  sellingUnits!: number;

  @ManyToOne(()=> PricingList, (pricingList)=> pricingList.products)
  pricingList!: PricingList;


  async toJson() {

    const buyingUnitsRepo = AppDataSource.getRepository(BuyingUnits);
    const sellingUnitsRepo = AppDataSource.getRepository(SellingUnits);
    
    return new ProductJson({
      id: this.id,
      name: this.name,
      stockingUnit: this.stockingUnit,
      unitPrice: this.unitPrice,
      stockEntries: this.stockEntries,
      invoices: this.invoices,
      pricingList: this.pricingList,
      buyingUnits: this.buyingUnits,
      sellingUnits: this.sellingUnits
    });
  }
}

