import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_book_resn",{schema:"chungxe_booking"})
export class cx_book_resn {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"book_resn_id"
        })
    book_resn_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"book_resn_name"
        })
    book_resn_name:string;
        
}
