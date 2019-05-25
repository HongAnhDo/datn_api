import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_modl",{schema:"chungxe_vehicle"})
@Index("vhc_modl_name_UNIQUE",["vhc_modl_name",],{unique:true})
export class cx_vhc_modl {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_modl_id"
        })
    vhc_modl_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"vhc_modl_name"
        })
    vhc_modl_name:string;
        

    @Column("int",{ 
        nullable:false,
        name:"vhc_bran_id"
        })
    vhc_bran_id:number;
        
}
