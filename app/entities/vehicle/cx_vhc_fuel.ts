import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";


@Entity("cx_vhc_fuel",{schema:"chungxe_vehicle"})
@Index("vhc_fuel_name_UNIQUE",["vhc_fuel_name",],{unique:true})
export class cx_vhc_fuel {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"vhc_fuel_id"
        })
    vhc_fuel_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"vhc_fuel_name"
        })
    vhc_fuel_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"vhc_fuel_name_en"
        })
    vhc_fuel_name_en:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"vhc_fuel_slug"
        })
    vhc_fuel_slug:string | null;
        
}
