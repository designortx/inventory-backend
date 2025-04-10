import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Invoice } from "./Invoice";


@Entity()
export class InvoiceItem {

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(()=> Product, (product)=> product.id)
  product!: string;

  @Column('int')
  quantity!: number;

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
  cost!: number;

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
  amount!: number;

  // Pointer to the the invoice
  @ManyToOne(()=> Invoice, (invoice)=> invoice.items)
  invoice!: Invoice;

}