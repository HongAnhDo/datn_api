import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_opt",{schema:"chungxe_vehicle"})
@Index("vhc_opt_name_UNIQUE",["vhc_opt_name",],{unique:true})
export class cx_vhc_opt {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_opt_id"
        })
    vhc_opt_id:number;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:255,
        name:"vhc_opt_name"
        })
    vhc_opt_name:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"vhc_opt_name_en"
        })
    vhc_opt_name_en:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:255,
        name:"vhc_opt_ico"
        })
    vhc_opt_ico:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"vhc_opt_prty"
        })
    vhc_opt_prty:number | null;
        
}
