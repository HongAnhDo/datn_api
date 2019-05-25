import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_book_stt",{schema:"chungxe_booking"})
@Index("book_stt_name_UNIQUE",["book_stt_name",],{unique:true})
export class cx_book_stt {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"book_stt_id"
        })
    book_stt_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"book_stt_name"
        })
    book_stt_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        name:"book_stt_ico"
        })
    book_stt_ico:string | null;
        
}
