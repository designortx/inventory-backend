import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Delivery } from "./Devliery";

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
    notes!: string;

    @Column()
    issueDate!: string;

    // Put proper precision and scale
    @Column('decimal', { precision: 10, scale: 2 })
    tax!: number;

    // Put proper precision and scale
    @Column('decimal', { precision: 10, scale: 2 })
    discount!: number;

    // TOTAL and NOT sub-total
    @Column('decimal', { precision: 10, scale: 2 })
    total!: number;

    @ManyToOne(()=> Product, (product)=> product.invoices)
    product!: Product;

    @OneToOne(()=> Delivery, (delivery)=> delivery.invoice)
    delivery!: Delivery;

}