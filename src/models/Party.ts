import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Invoice } from "./Invoice";

@Entity()
export class Party {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    type!: string;

    @Column()
    location?: string;

    @OneToMany(()=> Invoice, (invoice)=> invoice.party)
    invoices?: Invoice[];
}