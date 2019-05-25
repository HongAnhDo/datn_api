import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_vhc_schl",{schema:"chungxe_partner"})
export class cx_vhc_schl {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"vhc_schl_id"
        })
    vhc_schl_id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"vhc_part_id"
        })
    vhc_part_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"vhc_schl_name"
        })
    vhc_schl_name:string | null;
        

    @Column("timestamp",{ 
        nullable:false,
        name:"date_stat"
        })
    date_stat:Date;
        

    @Column("timestamp",{ 
        nullable:false,
        name:"date_end"
        })
    date_end:Date;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"schl_note"
        })
    schl_note:string | null;
        
}
