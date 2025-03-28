import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Vendor {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;
}