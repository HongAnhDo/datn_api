import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cx_requirement_special",{schema:"chungxe_booking"})
@Index("Index 1",["requ_id",])
export class cx_requirement_special {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"requ_id"
        })
    requ_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"ctms_name"
        })
    ctms_name:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"ctsm_phon"
        })
    ctsm_phon:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"ctms_addr"
        })
    ctms_addr:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"ctms_emai"
        })
    ctms_emai:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"ctms_requ"
        })
    ctms_requ:string | null;
        
}
