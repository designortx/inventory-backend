import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./Invoice";


@Entity()
export class Delivery {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status?: string;

    @Column({ nullable: true })
    dueDate?: string;

    @OneToOne(()=> Invoice, (invoice)=> invoice.delivery)
    invoice!: Invoice;
}