import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId, PrimaryGeneratedColumn} from "typeorm";


@Entity("cx_user_conf",{schema:"chungxe_user"})
export class cx_user_conf {

    @PrimaryGeneratedColumn()
    user_conf_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_conf_code"
        })
    user_conf_code:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_conf_val_vn"
        })
    user_conf_val_vn:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_conf_val_en"
        })
    user_conf_val_en:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_conf_val_cn"
        })
    user_conf_val_cn:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_conf_aval_from"
        })
    user_conf_aval_from:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"user_conf_aval_to"
        })
    user_conf_aval_to:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_conf_crta"
        })
    user_conf_crta:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_conf_upda"
        })
    user_conf_upda:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"user_conf_del"
        })
    user_conf_del:Date | null;
        
}
