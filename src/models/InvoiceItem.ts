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

    @Column('decimal')
    cost!: number;

    @Column('decimal')
    amount!: number;

    // Pointer to the the invoice
    @ManyToOne(()=> Invoice, (invoice)=> invoice.items)
    invoice!: Invoice;

}