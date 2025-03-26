
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

import { Product } from "./Product";

@Entity()
export class Stock {
    @ManyToOne(()=> Product, (product)=> product.stockEntries, { onDelete: "CASCADE" })
    product!: Product;

    @Column('int')
    quantity!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    value!: number;
}