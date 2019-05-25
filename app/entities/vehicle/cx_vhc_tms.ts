import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_tms",{schema:"chungxe_vehicle"})
@Index("vhc_tms_name_UNIQUE",["vhc_tms_name",],{unique:true})
export class cx_vhc_tms {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_tms_id"
        })
    vhc_tms_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:128,
        name:"vhc_tms_name"
        })
    vhc_tms_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"vhc_tms_name_en"
        })
    vhc_tms_name_en:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"vhc_tms_slug"
        })
    vhc_tms_slug:string | null;
        

    @Column("int",{ 
        nullable:false,
        name:"vhc_type_id"
        })
    vhc_type_id:number;
        
}
