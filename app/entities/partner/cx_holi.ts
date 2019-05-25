import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("cx_holi",{schema:"chungxe_partner"})
@Index("holi_name_UNIQUE",["holi_name",],{unique:true})
@Index("holi_name_en_UNIQUE",["holi_name_en",],{unique:true})
export class cx_holi {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"holi_id"
        })
    holi_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"holi_name"
        })
    holi_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        length:128,
        name:"holi_name_en"
        })
    holi_name_en:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:10,
        name:"holi_day_from"
        })
    holi_day_from:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"holi_day_to"
        })
    holi_day_to:string;
        
}
