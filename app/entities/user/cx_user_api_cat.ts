import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId, PrimaryGeneratedColumn} from "typeorm";


@Entity("cx_user_api_cat",{schema:"chungxe_user"})
export class cx_user_api_cat {

    @PrimaryGeneratedColumn()
    user_api_cat_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_api_cat_name"
        })
    user_api_cat_name:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_api_crta"
        })
    user_api_crta:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_api_upda"
        })
    user_api_upda:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_api_del"
        })
    user_api_del:Date | null;
        
}
