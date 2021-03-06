import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("cx_city",{schema:"chungxe_partner"})
@Index("city_name_UNIQUE",["city_name",],{unique:true})
@Index("city_name_en_UNIQUE",["city_name_en",],{unique:true})
export class cx_city {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"city_id"
        })
    city_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"city_code"
        })
    city_code:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"city_name"
        })
    city_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        length:128,
        name:"city_name_en"
        })
    city_name_en:string | null;
        
}
