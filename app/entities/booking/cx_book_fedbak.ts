import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_book_fedbak",{schema:"chungxe_booking"})
export class cx_book_fedbak {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"book_fedbak_id"
        })
    book_fedbak_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"book_id"
        })
    book_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"user_id"
        })
    user_id:number;
        

    @Column("int",{ 
        nullable:true,
        name:"book_fedbak_star"
        })
    book_fedbak_star:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"book_fedbak_cmt"
        })
    book_fedbak_cmt:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"book_fedbak_crta"
        })
    book_fedbak_crta:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"book_fedbak_del"
        })
    book_fedbak_del:Date | null;
        
}
