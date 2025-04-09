import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";


@Entity()
export class Units {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('boolean')
    isBuyingUnits!: boolean;

    @Column()
    unit!: string;

    @Column('decimal')
    relationship!: number;

    @Column()
    relationBy!: string;
}