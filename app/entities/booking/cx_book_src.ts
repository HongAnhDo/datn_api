import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity("cx_book_src", { schema: "chungxe_booking" })
export class cx_book_src {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "book_src_id"
    })
    book_src_id: number;


    @Column("varchar", {
        nullable: false,
        name: "book_src_name"
    })
    book_src_name: string;


    @Column("varchar", {
        nullable: false,
        name: "book_src_key"
    })
    book_src_key: string;
}

