import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_book_prie_type",{schema:"chungxe_booking"})
@Index("book_prie_type_code_UNIQUE",["book_prie_type_code",],{unique:true})
export class cx_book_prie_type {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"book_prie_type_id"
        })
    book_prie_type_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"book_prie_type_code"
        })
    book_prie_type_code:string;
        

    @Column("varchar",{ 
        nullable:true,
        name:"book_prie_type_name"
        })
    book_prie_type_name:string | null;
        
}
