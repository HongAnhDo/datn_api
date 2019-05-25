import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId, PrimaryGeneratedColumn} from "typeorm";


@Entity("cx_user_part",{schema:"chungxe_user"})
export class cx_user_part {

    @PrimaryGeneratedColumn()
    user_part_id:number;
        

    @Column("int",{ 
        nullable:true,
        name:"user_part_cat_id"
        })
    user_part_cat_id:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_part_name"
        })
    user_part_name:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"rate_part_id"
        })
    rate_part_id:number | null;
        
}
