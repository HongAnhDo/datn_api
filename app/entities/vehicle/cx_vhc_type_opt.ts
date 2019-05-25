import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_type_opt",{schema:"chungxe_vehicle"})
export class cx_vhc_type_opt {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_type_opt_id"
        })
    vhc_type_opt_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"vhc_opt_id"
        })
    vhc_opt_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"vhc_type_id"
        })
    vhc_type_id:number;
        
}
