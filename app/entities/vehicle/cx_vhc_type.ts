import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_type",{schema:"chungxe_vehicle"})
@Index("vhc_type_code_UNIQUE",["vhc_type_code",],{unique:true})
export class cx_vhc_type {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_type_id"
        })
    vhc_type_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:128,
        name:"vhc_type_name"
        })
    vhc_type_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"vhc_type_name_en"
        })
    vhc_type_name_en:string | null;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:45,
        name:"vhc_type_code"
        })
    vhc_type_code:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"vhc_type_slug"
        })
    vhc_type_slug:string | null;
        
}
