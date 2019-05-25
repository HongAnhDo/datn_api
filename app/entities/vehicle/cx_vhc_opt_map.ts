import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_opt_map",{schema:"chungxe_vehicle"})
export class cx_vhc_opt_map {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_opt_map_id"
        })
    vhc_opt_map_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"vhc_opt_id"
        })
    vhc_opt_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"vhc_id"
        })
    vhc_id:number;
        
}
