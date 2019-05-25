import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId, PrimaryGeneratedColumn} from "typeorm";


@Entity("cx_user_img",{schema:"chungxe_user"})
export class cx_user_img {

    @PrimaryGeneratedColumn()
    user_img_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"user_img_url"
        })
    user_img_url:string;
    

    @Column("int",{ 
        nullable:false,
        name:"proc_img_indx"
        })
    proc_img_indx:number;
        

    @Column("int",{ 
        nullable:false,
        name:"proc_id"
        })
    proc_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"user_acc_id"
        })
    user_acc_id:number;

    @Column("varchar",{ 
        nullable:true,
        name:"user_img_name"
        })
    user_img_name:string | null;
        
}
