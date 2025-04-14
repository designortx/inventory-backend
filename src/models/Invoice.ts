import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Delivery } from "./Devliery";
import { Party } from "./Party";
import { InvoiceItem } from "./InvoiceItem";

@Entity()
export class Invoice {

  // Invoice number
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  poSoNumber?: string;
  
  @Column()
  paymentMethod?: string;

  // Payment due date
  @Column()
  dueDate?: string;

  @Column()
  projectDetail!: string;

  @Column()
  notes?: string;

  @Column()
  issueDate!: string;

  // Put proper precision and scale
  @Column(
    'decimal',
    {
      precision: 10,
      scale: 2,
      transformer: {
          to: (value: number) => value, // store as is
          from: (value: string): number => parseFloat(value), // convert to number when reading
      }
    }
  )
  tax!: number;

  // Put proper precision and scale
  @Column(
    'decimal',
    {
      precision: 10,
      scale: 2,
      transformer: {
        to: (value: number) => value, // store as is
        from: (value: string): number => parseFloat(value), // convert to number when reading
      }
    }
  )
  discount!: number;

  // TOTAL and NOT sub-total
  @Column(
  'decimal',
    {
      precision: 10,
      scale: 2,
      transformer: {
        to: (value: number) => value, // store as is
        from: (value: string): number => parseFloat(value), // convert to number when reading
      }
    }
  )
  total!: number;

  // @ManyToMany(()=> Product, (product)=> product.invoices)
  // products!: Product[];

  @OneToOne(()=> Delivery, (delivery)=> delivery.invoice, { nullable: true })
  delivery?: Delivery;

  // Party
  @ManyToOne(()=> Party, (party)=> party.invoices)
  party!: Party;

  // Invoice items
  @OneToMany(()=> InvoiceItem, (invoiceItem)=> invoiceItem.invoice)
  items!: InvoiceItem[];

}