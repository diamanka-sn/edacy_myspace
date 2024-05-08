import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number | string

    @Column()
    firstname!: string

    @Column()
    lastname!: string
    @Column()
    login!: string
    @Column()
    password!: string

}
