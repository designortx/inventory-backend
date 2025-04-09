import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class PricingList {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal', {nullable: true})
    web?: number;

    @Column('decimal', {nullable: true})
    premium?: number;

    @Column('decimal', {nullable: true})
    retail?: number;

    @Column('decimal', {nullable: true})
    wholesale?: number;

    @Column('decimal', {nullable: true})
    referral?: number;

    @OneToMany(()=> Product, (product)=> product.pricingList)
    products!: Product[];
}